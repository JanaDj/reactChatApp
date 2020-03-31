const Sequelize = require("sequelize");

module.exports = sequelize => {
  class ChatUser extends Sequelize.Model {}
  ChatUser.init(
    {
      ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      chatId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "chats",
          key: "chatId"
        },
        validate: {
          notEmpty: {
            msg: "Please provide value for 'chatId"
          },
          notNull: {
            msg: "Please provide value for 'chatId'"
          }
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "userId"
        },
        validate: {
          notEmpty: {
            msg: "Please provide value for 'userId'"
          },
          notNull: {
            msg: "Please provide value for 'userId'"
          }
        }
      }
    },
    {
      tableName: "chat_user",
      timestamps: false,
      sequelize
    }
  );

  return ChatUser;
};
