const Sequelize = require("sequelize");

const sequelize = new Sequelize("chatapp", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql"
});

const db = {
  sequelize,
  Sequelize,
  models: {}
};

db.models.Chat = require("./models/Chat.js")(sequelize);
db.models.ChatUser = require("./models/ChatUser.js")(sequelize);
db.models.Message = require("./models/Message.js")(sequelize);
db.models.User = require("./models/User.js")(sequelize);

module.exports = db;
