const db = require("../index");
const { Message, User } = db.models;

/**
 * Function to create a new chat message
 * @param {*} userId , id of the user that sent the msg
 * @param {*} chatId , id of the chat message was sent to
 * @param {*} messageText , text of the message
 */
async function createMessage(userId, chatId, messageText) {
  const message = await Message.create({
    userId,
    chatId,
    messageText
  });
  return message.get();
}

/**
 * Function to retrieve all messages
 */
async function getAllMessages() {
  const messages = await Message.findAll({
    raw: true
  });
  return messages;
}

/**
 * Function to retrieve messages by userId
 * Function returns all messages with specified userId
 * @param {int} userId , id of the user for whom we want to get messages
 */
async function getAllMessagesByUserId(userId) {
  const messages = await Message.findAll({
    where: {
      userId
    },
    raw: true
  });
  return messages;
}

/**
 * Function to retrieve messages by chatId
 * Function returns all messages with specified chatId
 * @param {int} chatId , id of the chat for which we want to get messages
 */
async function getAllMessagesByChatId(chatId) {
  const messages = await Message.findAll({
    where: {
      chatId
    },
    raw: true
  });
  return messages;
}

// create messages with username (joined tables):
async function getFormattedMessagesByChatId(chatId) {
  const messages = await Message.findAll({
    where: {
      chatId
    },
    include: [
      {
        model: User,
        required: true
      }
    ],
    raw: true
  });
  // process messages before returning them:
  const formattedMsgs = messages.map(message => {
    return {
      message: message.messageText,
      name: message["User.username"]
    };
  });
  return formattedMsgs;
}
User.hasMany(Message, { foreignKey: "userId" });
Message.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  getAllMessages,
  getAllMessagesByUserId,
  getAllMessagesByChatId,
  getFormattedMessagesByChatId,
  createMessage
};
