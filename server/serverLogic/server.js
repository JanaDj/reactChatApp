const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = (module.exports.io = require("socket.io")(http));
const port = process.env.PORT || 3000;

// db reated
const db = require("../db");
const { Chat, ChatUser, Message, User } = db.models;
const { Op } = db.Sequelize;

const Sequelize = require("sequelize");
const sequelize = new Sequelize("chatapp", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql"
});

const router = require("./router");
app.use(router);
const socketManager = require("./socketManager");

// socket logic
io.on("connection", socketManager);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({
      force: true
    });
    // const newUser = await User.create({
    //   username: "test",
    //   password: "test"
    // });

    // // sequelize crud methods:

    // // find one (by search condition)
    // const message = await PublicChatMessage.findOne({
    //   where: {
    //     name: "jana"
    //   }
    // });

    // // find all
    // const messages = await PublicChatMessage.findAll();

    // // find all can be filtered:
    // const filteredMessages = await PublicChatMessage.findAll({
    //   where: {
    //     name: "jana2",
    //     message: "hello"
    //   },
    //   order: [["id", "ASC"]]
    // });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map(err => err.message);
      console.error("Validation errors: ", errors);
    } else {
      throw error;
    }
  }
})();

// mysql
// create connection
// const db = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "",
//   database: "chatApp"
// });

// connection
// db.connect(err => {
//   if (err) {
//     throw err;
//   }
//   console.log("Connection to the db successful");
// });

// create db
// app.get("ceratedb", (req, res) => {
//   let sql = "CREATE DATABASE db_name";
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Database created successfully");
//   });
// });

/**
 * server gets started on the defined port
 * when server is started, we are also clearing redisClient data, so chat history gets deleted as well
 */
http.listen(port, () => {
  console.log(
    `Express server listening on port ${port} and worker ${process.pid}`
  );
});
