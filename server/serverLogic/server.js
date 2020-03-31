const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = (module.exports.io = require("socket.io")(http));
const port = process.env.PORT || 3000;
const cors = require("cors");

// db reated
const db = require("../db");
const { Chat, ChatUser, Message, User } = db.models;
const { Op } = db.Sequelize;

const Sequelize = require("sequelize");
const sequelize = new Sequelize("chatapp", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql"
});

app.use(cors());
app.options("*", cors());
const router = require("./router");
app.use(express.json());
app.use(router);

const socketManager = require("./socketManager");

// socket logic
io.on("connection", socketManager);

// error handling
app.use((req, res, next) => {
  const err = new Error("Not Found");
  res.status(404);
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

(async () => {
  try {
    await db.sequelize.sync();
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map(err => err.message);
      console.error("Validation errors: ", errors);
    } else {
      throw error;
    }
  }
})();

/**
 * server gets started on the defined port
 * when server is started, we are also clearing redisClient data, so chat history gets deleted as well
 */
http.listen(port, () => {
  console.log(
    `Express server listening on port ${port} and worker ${process.pid}`
  );
});
