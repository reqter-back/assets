var multer  = require('multer')
var disk = require('../storages/diskStorage');
var config = require('../config');
var multerS3 = require('multer-s3')
var aws = require('aws-sdk');
var path = require('path');

exports.upload = (req, res, next)=>
{
    var storage = undefined;
    if (config.storageType == "disk")
        storage = disk;
    else
    {
        switch(req.account_type)
        {
            default :
            case "free" : 
            storage = getFreeUserStorage(req);
            break;
            case "advanced" : 
            storage = getAdvancedUserStorage(req);
            break;
            case "premium" : 
            storage = getPremiumUserStorage(req);
            break;
        }
    }
    var upload = multer({storage : storage});
    const singleUpload = upload.single('file');
    singleUpload(req, res, function(err, some) {
        console.log(err);
        if (err) {
          return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
        }
        next();
      });
}

function getFreeUserStorage(req, file)
{
    aws.config.update({
        secretAccessKey: process.env.AWS_FREE_SECRETKEY || "oh/oiBncgeI4qryeteNY//dA2sz+y7GW3+fECz2O",
        accessKeyId: process.env.AWS_FREE_ACCESSKEY || "AKIAWBLIRXLIXH27T66T",
        region :  process.env.AWS_FREE_REGION || "us-east-1"
    });
    var s3 = new aws.S3({ /* ... */ })
    var storage = multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKETNAME || "caas",
        acl : "public-read",
        metadata: function (req, file, cb) {
          cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
          var p = path.extname(file.originalname.toString());
          cb(null, req.userId + "/" + file.fieldname + '-' + Date.now().toString() + p)
        }
      });
      return storage;
}

function getAdvancedUserStorage(req, file)
{
    aws.config.update({
        secretAccessKey: process.env.AWS_FREE_SECRETKEY || "c42eMoVdnweCUDqvEWQ4+byTn1+5v5CbD5dRNAKg",
        accessKeyId: process.env.AWS_FREE_ACCESSKEY || "AKIAJAL6VKDOXKAMEWFA",
        region: process.env.AWS_FREE_REGION || "us-east-1"  
    });
    var s3 = new aws.S3({ /* ... */ })
    var storage = multerS3({
        s3: s3,
        bucket: "reqter",
        acl : "public-read",
        metadata: function (req, file, cb) {
          cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
          cb(null, Date.now().toString())
        }
      });
      return storage;
}

function getPremiumUserStorage(req, file)
{
    aws.config.update({
        secretAccessKey: process.env.AWS_FREE_SECRETKEY || "c42eMoVdnweCUDqvEWQ4+byTn1+5v5CbD5dRNAKg",
        accessKeyId: process.env.AWS_FREE_ACCESSKEY || "AKIAJAL6VKDOXKAMEWFA",
        region: process.env.AWS_FREE_REGION || "us-east-1"  
    });
    var s3 = new aws.S3({ /* ... */ })
    var storage = multerS3({
        s3: s3,
        bucket: "reqter",
        metadata: function (req, file, cb) {
          cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
          cb(null, Date.now().toString())
        }
      });
      return storage;
}