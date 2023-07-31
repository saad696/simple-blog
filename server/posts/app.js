const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// data object
const posts = [];

// helper methods
const generateId = () => randomBytes(4).toString('hex');

//middlewares
app.use(cors());
app.use(bodyParser.json());

// routes
app.get('/', (req, res) => {
    res.json({ data: posts });
});

app.post('/posts', (req, res) => {
    const { title, content } = req.body.data;

    if (!title || !content)
        return res
            .status(400)
            .json({
                message: `${title ? 'Post Content' : 'Post Title'} is required`,
            });

    const id = generateId();

    posts.push({
        id,
        title,
        content,
    });

    res.status(201).json({ message: 'post created succesfully' });
});

app.listen(4000, () => {
    console.log('Server started on port:4000');
});
