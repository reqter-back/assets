var multerS3 = require('multer-s3')
var aws = require('aws-sdk');
aws.config.update({
  secretAccessKey: "ab7786ad6",
  accessKeyId: "ab7786ad6",
  region: 'us-east-1' // region of your bucket
});

var s3 = new aws.S3({ /* ... */ })
var storage = multerS3({
    s3: s3,
    bucket: function (req, file, cb) {
      switch(req.account_type)
      {
          default :
          case "free" : 
          cb(null, getFreeUserBucket(req, file));
          break;
          case "advanced" : 
          cb(null, getAdvancedUserBucket(req, file));
          break;
          case "premium" : 
          cb(null, getPremiumUserBucket(req, file));
          break;
      }
    },
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  });


  module.exports = storage;