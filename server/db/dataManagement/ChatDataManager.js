const db = require("./index");
const { Chat } = db.models;

/**
 * Function to create a new chat
 * @param {string} chatName , name of the new chat to create
 */
async function createChat(chatName) {
  const chat = await Chat.create({
    chatName
  });
  return chat.get();
}

/**
 * Function to retrieve all chats
 */
async function getAllChats() {
  const chats = await Chat.findAll({
    raw: true
  });
  return chats;
}

/**
 * Function to retrieve chat by primary key (chatID)
 * @param {int} id , id of the chat to retrieve
 */
async function getChatById(id) {
  const chat = await Chat.findByPk(id);
  return chat.get();
}

/**
 * Function to retrieve chat by chatName
 * @param {string} chatName , name of the chat to retrieve
 */
async function getChatByChatName(chatName) {
  const chat = await Chat.findOne({
    where: {
      chatName
    },
    raw: true
  });
  return chat;
}
module.exports = {
  getAllChats,
  getChatById,
  getChatByChatName,
  createChat
};
