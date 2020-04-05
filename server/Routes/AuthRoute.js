const express = require("express");
const router = express.Router();
const UserDataManager = require("../db/dataManagement/UserDataManager");

// Handler function to wrap routes
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

/**
 * POST route for '/register'
 * This endpoint is used to create new user
 * Request body accepts 2 body parameters: username and password (to be added: support for avatar image)
 * If parameters are missing error 400 is thrown
 * User is returned in response if everything is successful
 */
/**
 * @swagger
 *
 * /api/v1/auth/register:
 *   post:
 *     tags: [
 *       "Auth" ]
 *     summary: Use to create a new user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - username, password
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: User successfully created.
 */
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    if (req.body.username && req.body.password) {
      const user = await UserDataManager.createUser(
        req.body.username,
        req.body.password
      );
      if (user !== null) {
        res.status(201).json(user);
      } else {
        res.status(400).json({
          message: "Username not available. Please try a different username."
        });
      }
    } else {
      res.status(400).json({
        message: "Please fill in all the required fields."
      });
    }
  })
);

/**
 * POST route for '/authenticate'
 * This endpoint is used to validate user credentials
 * It first checks if both properties are entered (username and password)
 * It then checks if user exists and if it does, it checks that password matches
 */
/**
 * @swagger
 *
 * /api/v1/auth/authenticate:
 *   post:
 *     tags: [
 *       "Auth" ]
 *     summary: Use to validate user credentials
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to validate.
 *         schema:
 *           type: object
 *           required:
 *             - username, password
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: User successfully validated.
 */
router.post(
  "/authenticate",
  asyncHandler(async (req, res) => {
    if (req.body.username && req.body.password) {
      const user = await UserDataManager.getUserByUsername(req.body.username);
      if (user !== null && user.password === req.body.password) {
        res.status(200).json(user);
      } else {
        res.status(400).json({
          message: "Invalid username or password."
        });
      }
    } else {
      res.status(400).json({
        message: "Please fill in all the required fields."
      });
    }
  })
);

module.exports = router;
