const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.json());

const posts = {};

app.get("/posts", (req, res) => {
  res.status(200).json({ data: posts });
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type === "PostCreated") {
    const { id, title, content } = data;

    posts[id] = { id, title, content, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, comment, postId, status } = data;

    const post = posts[postId];

    post.comments.push({ id, comment, postId, status })
  }

  if (type === "CommentUpdated") {
    const { id, comment, postId, status } = data;

    const post = posts[postId];

    const _comment = post.comments.find(comment => comment.id === id);

    _comment.status = status,
    _comment.comment = comment
  }

  console.log(posts)

  res.status(200).json({ message: "Event processed" });
});

app.listen("4002", () => {
  console.log("Query service running on port:4002");
});
