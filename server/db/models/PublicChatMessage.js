const Sequelize = require("sequelize");

module.exports = sequelize => {
  class PublicChatMessage extends Sequelize.Model {}
  PublicChatMessage.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      sender: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please provide value for 'sender'"
          },
          notNull: {
            msg: "Please provide value for 'sender'"
          }
        }
      },
      message: {
        type: Sequelize.TEXT(500),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please provide value for 'message'"
          },
          notNull: {
            msg: "Please provide value for 'message'"
          }
        }
      }
    },
    {
      tableName: "public_chat_messages",
      sequelize
    }
  );

  return PublicChatMessage;
};
