const Sequelize = require("sequelize");

module.exports = sequelize => {
  class ChatUser extends Sequelize.Model {}
  ChatUser.init(
    {
      chatId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
