const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

//middlewares
app.use(bodyParser.json());

const Filter = require("bad-words"),
  filter = new Filter();

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = filter.isProfane(data.comment) ? "Rejected" : "Approved";

    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        comment: data.comment,
      },
    });
  }
  res.status(200).send({ status: "OK" });
});

app.listen(4003, async () => {
  console.log("Comment Moderation service running on port:4003");

  const { data: apiData } = await axios.get("http://localhost:4005/get-events");

  const filteredCommentCreated = apiData.data.filter(
    (item) =>
      item.type === "CommentCreated" &&
      !apiData.data.some(
        (otherItem) =>
          (otherItem.type === "CommentModerated" ||
            otherItem.type === "CommentUpdated") &&
          otherItem.data.id === item.data.id
      )
  );

  console.log(filteredCommentCreated);

  for (let { type, data } of filteredCommentCreated) {
    const status = filter.isProfane(data.comment) ? "Rejected" : "Approved";
    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        comment: data.comment,
      },
    });
  }
});
