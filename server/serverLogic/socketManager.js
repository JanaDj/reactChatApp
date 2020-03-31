const io = require("./server.js").io;
const MessageDataManager = require("../db/dataManagement/MessageDataManager");
const ChatUserDataManager = require("../db/dataManagement/ChatUserDataManager");
const {
  addUser,
  removeUser,
  getUser,
  getUsers,
  getUserByName
} = require("./users");

// storing connected users
const users = {};

module.exports = function(socket) {
  /**
   * io event triggered upon connection
   */
  // new user joined
  /**
   * socket event that is triggered if new user joins
   * 'user-connected' event gets broadcast emited to all other users (user that joined and triggered event doesn't get the user-connected event)
   */
  socket.on("new-user", async (name, userId) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
    addUser({ id: socket.id, name });
    io.emit("roomData", { users: getUsers() });
    // add user to the chat-user table
    await ChatUserDataManager.createChatUser(1, userId);
  });
  /**
   * socket event that gets triggered on 'send-chat-message'
   * this event will broadcast emit the new 'chat-message' event and pass message information. This event gets sent to all other users but not the user sending the message
   */
  socket.on("send-chat-message", async (message, userId, callback) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id]
    });
    callback();
    // add logic to store message history here
    await MessageDataManager.createMessage(userId, 1, message);
  });
  /**
   * socket event that gets triggered on 'disconnect'
   * this event will broadcast emit the new 'user-disconnected' event and pass over id of the disconnected user socket to all other users
   * user will also be removed from the list of users
   */
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    removeUser(socket.id);
    // remove user
    io.emit("roomData", { users: getUsers() });
  });
  /**
   * socket event that gets triggered on 'privateChat'
   * this event will notify selected user they have a private chat
   * emmit event will be triggered to client to 'start-private-chat'
   */
  socket.on("privateChat", receiver => {
    const receiverUser = getUser(receiver);
    // emit event to open private chat to receiver
    const sender = getUser(socket.id);
    io.to(receiverUser.id).emit("start-private-chat", sender);
  });
  /**
   * socket event that gets triggered on 'send-private-chat-message'
   * this event will emit emit the new 'private-chat-message' event and pass message information to the provided user. This event gets sent to the user privately
   */
  socket.on("send-private-chat-message", (message, msgReceiver, callback) => {
    console.log(msgReceiver);
    const receiverUser = getUserByName(msgReceiver);
    console.log("receiverUSer found by name: " + receiverUser.name);
    // emit event to open private chat to receiver
    io.to(receiverUser.id).emit("private-chat-message", {
      message: message,
      name: users[socket.id]
    });
    callback();
    // add logic to store message history here
  });
};
