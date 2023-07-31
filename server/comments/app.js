const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// data object
const commentByPostId = {};

// helper methods
const generateId = () => randomBytes(4).toString('hex');

//middlewares
app.use(cors());
app.use(bodyParser.json());

// routes
app.get('/posts/:id/comments', (req, res) => {
    res.json({ data: commentByPostId[req.params.id] || [] });
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = generateId();
    const { id } = req.params;
    const { comment } = req.body.data;

    const comments = commentByPostId[id] || [];
    comments.push({ id: commentId, comment });
    commentByPostId[id] = comments;
    res.status(201).json({ message: 'Comment added succesfully' });
});

app.listen(4001, () => {
    console.log('Server started on port:4001');
});
