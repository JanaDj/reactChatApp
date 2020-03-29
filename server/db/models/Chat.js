const Sequelize = require("sequelize");

module.exports = sequelize => {
  class Chat extends Sequelize.Model {}
  Chat.init(
    {
      chatId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      chatName: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please provide value for 'chatName'"
          },
          notNull: {
            msg: "Please provide value for 'chatName'"
          }
        }
      }
    },
    {
      tableName: "chats",
      timestamps: false,
      sequelize
    }
  );

  return Chat;
};
