const express = require("express");
const router = express.Router();
const UserDataManager = require("../db/dataManagement/UserDataManager");
const ChatUserDataManager = require("../db/dataManagement/ChatUserDataManager");
const MessageDataManager = require("../db/dataManagement/MessageDataManager");
// const { addUser, removeUser, getUser, getUsers } = require("./users");

// Handler function to wrap routes
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Get route for '/'
 * This route just confirms that server is up and running
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.send({ response: "Server is up and running." }).status(200);
  })
);

/**
 * POST route for '/register'
 * This endpoint is used to create new user
 * Request body accepts 2 body parameters: username and password (to be added: support for avatar image)
 * If parameters are missing error 400 is thrown
 * User is returned in response if everything is successful
 */
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    if (req.body.username && req.body.password) {
      const user = await UserDataManager.createUser(
        req.body.username,
        req.body.password
      );
      if (user !== null) {
        res.status(201).json(user);
      } else {
        res.status(400).json({
          message: "Username not available. Please try a different username."
        });
      }
    } else {
      res.status(400).json({
        message: "Please fill in all the required fields."
      });
    }
  })
);

/**
 * POST route for '/authenticate'
 * This endpoint is used to validate user credentials
 * It first checks if both properties are entered (username and password)
 * It then checks if user exists and if it does, it checks that password matches
 */
router.post(
  "/authenticate",
  asyncHandler(async (req, res) => {
    if (req.body.username && req.body.password) {
      const user = await UserDataManager.getUserByUsername(req.body.username);
      if (user !== null && user.password === req.body.password) {
        res.status(200).json(user);
      } else {
        res.status(400).json({
          message: "Invalid username or password."
        });
      }
    } else {
      res.status(400).json({
        message: "Please fill in all the required fields."
      });
    }
  })
);

/**
 * POST route for '/chatuser'
 * This endpoint is used to create new chatUser
 * Request body accepts 2 body parameters: chatId and userId
 * If parameters are missing error 400 is thrown
 */
router.post(
  "/chatuser",
  asyncHandler(async (req, res) => {
    if (req.body.chatId && req.body.userId) {
      const chatUser = await ChatUserDataManager.createChatUser(
        req.body.chatId,
        req.body.userId
      );
      res.status(200).json(chatUser);
    } else {
      res.status(400).json({
        message: "Please fill in all the required fields."
      });
    }
  })
);

/**
 * POST route for '/sendmessage'
 * This endpoint is used to create a new message record
 * Request body accepts 3 body parameters: chatId, userId and msgText
 * If parameters are missing error 400 is thrown
 * created message is returned in response
 */
router.post(
  "/sendmessage",
  asyncHandler(async (req, res) => {
    if (req.body.chatId && req.body.userId && req.body.msgText) {
      const message = await MessageDataManager.createMessage(
        req.body.chatId,
        req.body.userId,
        req.body.msgText
      );
      res.status(201).json(message);
    } else {
      res.status(400).json({
        message: "Please fill in all the required fields."
      });
    }
  })
);

/**
 * GET route for '/getpublicmessages'
 * This endpoint is used to get all messages from public chat (main chat)
 * Endpoint return array of messages
 */
router.get(
  "/getpublicmessages",
  asyncHandler(async (req, res) => {
    const messages = await MessageDataManager.getFormattedMessagesByChatId(1);
    res.status(201).json(messages);
  })
);

module.exports = router;
