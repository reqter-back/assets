var multerS3 = require('multer-s3')
var aws = require('aws-sdk');
var s3 = new aws.S3({ /* ... */ })
var storage = multerS3({
    s3: s3,
    bucket: 'some-bucket',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  });
  module.exports = storage;