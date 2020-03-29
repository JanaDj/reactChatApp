const Sequelize = require("sequelize");

module.exports = sequelize => {
  class Message extends Sequelize.Model {}
  Message.init(
    {
      messageId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      },
      chatId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please provide value for 'chatId'"
          },
          notNull: {
            msg: "Please provide value for 'chatId'"
          }
        }
      },
      messageText: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please provide value for 'messageText'"
          },
          notNull: {
            msg: "Please provide value for 'messageText'"
          }
        }
      }
    },
    {
      tableName: "messages",
      timestamps: false,
      sequelize
    }
  );

  return Message;
};
