const aws = require("aws-sdk");
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

const app = express();

aws.config.update({
  secretAccessKey: "Nhfu0DsSreewFng5M3JnbnSR1mZHwHD6coGI09mP",
  accessKeyId: "AKIAJDQ5Y2S7LNYRRX3Q",
  region: "eu-central-1"
});

const s3 = new aws.S3();

// file filter by file type
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid Mime Type, only JPEG and PNG are supported"), false);
//   }
// };

const upload = multer({
  //   fileFilter,
  storage: multerS3({
    s3,
    bucket: "reactchatapp",
    acl: "public-read",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      // appending file extension to the file name
      const fileName = Date.now().toString() + path.extname(file.originalname);
      cb(null, fileName);
    }
  })
});

module.exports = upload;
