const express = require("express");
const router = express.Router();
const ChatUserDataManager = require("../db/dataManagement/ChatUserDataManager");

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
 * POST route for '/chatuser'
 * This endpoint is used to create new chatUser
 * Request body accepts 2 body parameters: chatId and userId
 * If parameters are missing error 400 is thrown
 */
/**
 * @swagger
 *
 * /api/v1/chatuser/chatuser:
 *   post:
 *     tags: [
 *       "Chatuser" ]
 *     summary: Use to create new chat-user relation.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: chatuser
 *         description: chat-user relation
 *         schema:
 *           type: object
 *           required:
 *             - chatId, userId
 *           properties:
 *             chatId:
 *               type: integer
 *             userId:
 *               type: integer
 *     responses:
 *       201:
 *         description: User successfully created.
 */
router.post(
  "/chatuser",
  asyncHandler(async (req, res) => {
    if (req.body.chatId && req.body.userId) {
      const chatUser = await ChatUserDataManager.createChatUser(
        req.body.chatId,
        req.body.userId
      );
      res.status(201).json(chatUser);
    } else {
      res.status(400).json({
        message: "Please fill in all the required fields."
      });
    }
  })
);

module.exports = router;
