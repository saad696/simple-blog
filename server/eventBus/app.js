const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.json());

app.post('/events', (req, res) => {
    const event = req.body;

    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);
    axios.post('http://localhost:4002/events', event);

    res.status(200).send({ status: 'OK' });
});

app.listen(4005, () => {
    console.log("Event Bus running on port:4005")
})