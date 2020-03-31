const db = require("../index");
const { User } = db.models;

/**
 * Function to create a new user
 * Function first checks if username is unique, if it is, it creates a new user
 * If username is not unique, it returns null
 * @param {string} username , username for the new user
 * @param {string} password , password for the new user
 */
async function createUser(username, password) {
  // check if username already exists
  const available = await isUsernameAvailable(username);
  if (available) {
    const user = await User.create({
      username,
      password
    });
    return user.get();
  } else {
    return null;
  }
}

/**
 * Function to retrieve all users
 */
async function getAllUsers() {
  const users = await User.findAll({
    raw: true
  });
  return users;
}

/**
 * Function to retrieve a user by ID
 * @param {int} userId , id of user to retrieve
 */
async function getUserById(userId) {
  const user = await User.getUserByPk(userId);
  return user.get();
}

/**
 * Function to retrieve a user by username
 * @param {string} username , username of user to retrieve
 */
async function getUserByUsername(username) {
  const user = await User.findOne({
    where: {
      username
    },
    raw: true
  });
  return user;
}

/**
 * Function to check whether a username already exists or not
 * Function return true or false based on existance of the username
 * @param {string} username , username to check for
 */
async function isUsernameAvailable(username) {
  const user = await getUserByUsername(username);
  return user === null;
}

async function validateUserCredentials(username, password) {
  const user = await getUserByUsername(username);
  return user.password === password;
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  isUsernameAvailable,
  validateUserCredentials
};
