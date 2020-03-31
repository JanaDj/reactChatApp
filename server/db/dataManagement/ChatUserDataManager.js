const db = require("../index");
const { ChatUser } = db.models;

/**
 * Function to create new chat-user relation
 * Function first checks if chatuser exists, if it does, it just returns it
 * If it doesnt, it create a new entry in chatuser db and returns it
 * @param {*} chatId , id of the chat relation is created for
 * @param {*} userId , id of a user relation is created for
 */
async function createChatUser(chatId, userId) {
  // check if chatUser relation already exists:
  let chatUser = await ChatUser.findOne({
    where: {
      chatId,
      userId
    }
  });
  if (chatUser === null) {
    chatUser = await ChatUser.create({
      chatId,
      userId
    });
  }
  return chatUser.get();
}

/**
 * Function to get all chatuser relations by chatId
 * @param {id} chatId , id of chatId to search by
 */
async function getChatUserByChatId(chatId) {
  const chatsUsers = await ChatUser.findAll({
    where: {
      chatId
    },
    raw: true
  });
  return chatsUsers;
}

/**
 * Function to get all chatuser relations by userId
 * @param {id} userId , id of userId to search by
 */
async function getChatUserByUserId(userId) {
  const chatsUsers = await ChatUser.findAll({
    where: {
      userId
    },
    raw: true
  });
  return chatsUsers;
}

module.exports = {
  getChatUserByChatId,
  getChatUserByUserId,
  createChatUser
};
