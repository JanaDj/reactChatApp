const express = require("express");
const router = express.Router();
const { addUser, removeUser, getUser, getUsers } = require("./users");

router.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

router.get("/users", (req, res) => {
  const users = getUsers();
  res.send({ response: users }).status(200);
});
module.exports = router;
