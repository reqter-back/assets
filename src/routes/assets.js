var express = require('express');
var helper = require('../controllers/accountTypeHelper');

var router = express.Router();
var assetController = require('../controllers/assetController');
var auth = require('../controllers/auth');

router.post("/upload", auth.verifyToken, helper.upload, assetController.fileuploaded);
router.get("/download/:filename", helper.download);
module.exports = router;