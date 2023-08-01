const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

// data object
const commentByPostId = {};

// helper methods
const generateId = () => randomBytes(4).toString("hex");

//middlewares
app.use(cors());
app.use(bodyParser.json());

// routes
app.get("/posts/:id/comments", (req, res) => {
  res.json({ data: commentByPostId[req.params.id] || [] });
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = generateId();
  const { id } = req.params;
  const { comment } = req.body.data;

  const comments = commentByPostId[id] || [];
  comments.push({ id: commentId, comment });
  commentByPostId[id] = comments;

  /* emitting event */
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      comment,
      postId: id,
    },
  });

  res.status(201).json({ message: "Comment added succesfully" })
});

app.post("/events", (req, res) => {
    console.log("Event Recieved", req.body.type);
  
    res.status(200).json({ message: "Event recieved" });
  });

app.listen(4001, () => {
  console.log("Server started on port:4001");
});
