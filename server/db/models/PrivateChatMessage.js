const Sequelize = require("sequelize");

module.exports = sequelize => {
  class PrivateChatMessage extends Sequelize.Model {}
  PrivateChatMessage.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstUser: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please provide value for 'firstUser'"
          },
          notNull: {
            msg: "Please provide value for 'firstUser'"
          }
        }
      },
      secondtUser: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please provide value for 'secondtUser'"
          },
          notNull: {
            msg: "Please provide value for 'secondtUser'"
          }
        }
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
      tableName: "private_chat_messages",
      sequelize
    }
  );

  return PrivateChatMessage;
};
