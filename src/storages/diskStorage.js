var multer  = require('multer')
var path = require('path');
var fs = require('fs');

var storage = multer.diskStorage({
   destination: function (req, file, cb) {
     var dir = "uploads";
     if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
     }
     cb(null, 'uploads')
   },
   filename: function (req, file, cb) {
      var p = path.extname(file.originalname.toString());
      cb(null, file.fieldname + '-' + Date.now() + p)
   }
 })
 module.exports = storage;