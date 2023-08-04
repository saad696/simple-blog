const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.json());

const events = [];

app.post("/events", async (req, res, next) => {
  const event = req.body;

  events.push(event);

  const serviceUrls = [
    "http://localhost:4000/events",
    "http://localhost:4001/events",
    "http://localhost:4002/events",
    "http://localhost:4003/events",
  ];

  const promises = serviceUrls.map((url) => axios.post(url, event));

  // Use Promise.allSettled to handle all promises without crashing on error
  const results = await Promise.allSettled(promises);

  console.log(results)

  const errors = [];

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      const serviceUrl = serviceUrls[index];
      const error = result.reason.message;
      console.error(`Service cannot connect: ${serviceUrl}`);
      errors.push({ service: serviceUrl, error });
    }
  });

  console.log(events)

  if (errors.length > 0) {
    console.error("Errors occurred while sending events to services:", errors);
  }

  res.status(200).send({ status: "OK" });
});

app.get("/get-events", (req, res) => {
  res.status(200).json({ data: events });
});

app.listen(4005, () => {
  console.log("Event Bus running on port:4005");
});

// Graceful error handling for uncaught exceptions
// process.on('uncaughtException', (err) => {
//     return console.error('Uncaught Exception:', err);
//     // Optionally, you can perform some cleanup tasks here before letting the process exit.
//     // For example, close database connections, release resources, etc.
//     process.exit(1); // Ensure the process exits with a non-zero code to indicate an error.
// });

// // Graceful error handling for unhandled rejections (e.g., Promise rejections without a catch)
// process.on('unhandledRejection', (reason, promise) => {
//     return console.error('Unhandled Rejection:', reason);
//     // You can optionally perform some cleanup tasks here.
//     // Note that the process may still exit depending on the severity of the error.
// });

// // Graceful shutdown on process termination
// const gracefulShutdown = () => {
//     return console.log('Shutting down gracefully...');
//     // Optionally, you can perform cleanup tasks here before shutting down.
//     server.close(() => {
//         console.log('Server closed.');
//         process.exit(0);
//     });
// };

// // Handle process termination signals (e.g., CTRL+C)
// process.on('SIGINT', gracefulShutdown);
// process.on('SIGTERM', gracefulShutdown);
