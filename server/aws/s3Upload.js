const express = require("express");
const router = express.Router();
const multer = require("multer");
const AWS = require("aws-sdk");

// hide data
const BUCKET_NAME = "reactchatapp";
const IAM_USER_KEY = "AKIATVLKHZH5YXJE2TUG";
const IAM_USER_SECRET = "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";

const storage = multer.memoryStorage({
  destination: function(req, file, callback) {
    callback(null, "");
  }
});

const multipleUpload = multer({ storage: storage }).array("file");
const upload = multer({ storage: storage }).single("file");

router.post("/upload", multipleUpload, function(req, res) {
  const file = req.files;
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });
  s3bucket.createBucket(function() {
    let Bucket_Path = "https://reactchatapp.s3.eu-central-1.amazonaws.com";
    //Where you want to store your file
    var ResponseData = [];

    file.map(item => {
      var params = {
        Bucket: Bucket_Path,
        Key: item.originalname,
        Body: item.buffer,
        ACL: "public-read"
      };
      s3bucket.upload(params, function(err, data) {
        if (err) {
          res.json({ error: true, Message: err });
        } else {
          ResponseData.push(data);
          if (ResponseData.length === file.length) {
            res.json({
              error: false,
              Message: "File Uploaded Successfully",
              Data: ResponseData
            });
          }
        }
      });
    });
  });
});

module.exports = router;
