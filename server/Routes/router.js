const express = require("express");
const router = express.Router();

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
 * Get route for '/'
 * This route just confirms that server is up and running
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.send({ response: "Server is up and running." }).status(200);
  })
);

module.exports = router;
