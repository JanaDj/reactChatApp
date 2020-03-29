const express = require("express");
const router = express.Router();
const db = require("../db");
const { PublicChatMessage, PrivateChatmessage } = db.models;
// const { addUser, removeUser, getUser, getUsers } = require("./users");

// Handler function to wrap routes
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

router.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

router.post(
  "/publicMessage",
  asyncHandler(async (req, res) => {
    const message = await PublicChatMessage.create({});
  })
);
// router.get("/users", (req, res) => {
//   const users = getUsers();
//   res.send({ response: users }).status(200);
// });
module.exports = router;
