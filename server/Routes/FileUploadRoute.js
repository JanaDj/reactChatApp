const express = require("express");
const router = express.Router();
const upload = require("../aws/s3FileUpload");

// const singleUpload = upload.single("file");
const multiUpload = upload.array("files");

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
 * POST route for '/fileupload
 * This endpoint is used to upload 1 or multiple files
 * Endpoint returns fileUrl (array of URLs to the uploaded files)
 * Uploaded files are encoded (date.now) and file type extension is appended to the name
 */

router.post(
  "/fileupload",
  asyncHandler(async (req, res) => {
    multiUpload(req, res, function(err) {
      if (err) {
        return res.status(422).send({
          errors: [
            {
              title: "File uplaod error",
              detail: err.message
            }
          ]
        });
      }
      const paths = req.files.map(file => file.location);
      return res.json({ fileUrl: paths });
    });
  })
);

module.exports = router;
