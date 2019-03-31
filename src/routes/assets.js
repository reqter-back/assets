var express = require('express');
var multer  = require('multer')
var disk = require('../storages/diskStorage');
var s3 = require('../storages/s3Storage');
var config = require('../config');

var storage = undefined;
if (config.storageType == "disk")
    storage = disk;
else
    storage = s3;
var upload = multer({ storage : storage})

var router = express.Router();
var assetController = require('../controllers/assetController');
var auth = require('../controllers/auth');

router.post("/upload", auth.verifyToken, upload.single('file'), assetController.fileuploaded);
module.exports = router;