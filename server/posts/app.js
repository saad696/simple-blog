const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

// data object
const posts = [];

// helper methods
const generateId = () => randomBytes(4).toString("hex");

//middlewares
app.use(cors());
app.use(bodyParser.json());

// routes
app.get("/", (req, res) => {
  res.json({ data: posts });
});

app.post("/posts", async (req, res) => {
  const { title, content } = req.body.data;

  if (!title || !content)
    return res.status(400).json({
      message: `${title ? "Post Content" : "Post Title"} is required`,
    });

  const id = generateId();

  posts.push({
    id,
    title,
    content,
  });

  /* emitting event */
  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
      content,
    },
  })

  res.status(201).json({ message: "post created succesfully" });
});

app.post("/events", (req, res) => {
  console.log("Event Recieved", req.body.type);

  res.status(200).json({ message: "Event recieved" });
});

app.listen(4000, () => {
  console.log("Server started on port:4000");
});
