const db = require("./index");
const { PublicChatMessage, PrivateChatmessage } = db.models;

/**
 * Function to retrieve all public messages from the db
 */
async function getPublicMessages() {
  const messages = await PublicChatMessage.findAll();
  return messages;
}

async function getPrivateMessages(firstUser, secondUser) {
  const messages = await PrivateChatmessage.findAll({
    where: {
      firstUser: [firstUser, secondUser],
      secondUser: [firstUser, secondUser]
    }
  });
  return messages;
}
