const Sequelize = require("sequelize");

module.exports = sequelize => {
  class User extends Sequelize.Model {}
  User.init(
    {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please provide value for 'username'"
          },
          notNull: {
            msg: "Please provide value for 'username'"
          }
        }
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please provide value for 'password'"
          },
          notNull: {
            msg: "Please provide value for 'password'"
          }
        }
      },
      avatar: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    },
    {
      tableName: "users",
      sequelize,
      timestamps: false
    }
  );

  return User;
};
