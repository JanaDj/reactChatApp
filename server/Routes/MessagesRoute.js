const express = require("express");
const router = express.Router();
const MessageDataManager = require("../db/dataManagement/MessageDataManager");

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
 * POST route for '/sendmessage'
 * This endpoint is used to create a new message record
 * Request body accepts 3 body parameters: chatId, userId and msgText
 * If parameters are missing error 400 is thrown
 * created message is returned in response
 */
/**
 * @swagger
 *
 * /api/v1/messages/sendmessage:
 *   post:
 *     tags: [
 *       "Messages" ]
 *     summary: Use to create a new message
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - chatId, userId, msgText
 *           properties:
 *             chatId:
 *               type: integer
 *             userId:
 *               type: integer
 *             msgText:
 *               type: string
 *     responses:
 *       201:
 *         description: Message successfully created.
 */
router.post(
  "/sendmessage",
  asyncHandler(async (req, res) => {
    if (req.body.chatId && req.body.userId && req.body.msgText) {
      const message = await MessageDataManager.createMessage(
        req.body.userId,
        req.body.chatId,
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
/**
 * @swagger
 *
 * /api/v1/messages/getpublicmessages:
 *   get:
 *     tags: [
 *       "Messages" ]
 *     summary: Use to get all public chat messages
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Messages retrieved successfully.
 */
router.get(
  "/getpublicmessages",
  asyncHandler(async (req, res) => {
    const messages = await MessageDataManager.getFormattedMessagesByChatId(1);
    res.status(200).json(messages);
  })
);

module.exports = router;
