var GridFSStorage = require("multer-gridfs-storage");
var path = require("path");
var fs = require("fs");
var MongoClient = require("mongodb");
var url =
  process.env.FileDB_URL ||
  "mongodb://fakhrad:logrezaee24359@ds231537.mlab.com:31537/files";
var storage = undefined;
storage = new GridFSStorage({
  url: url,
  cache: true,
  file: (req, file) => {
    console.log(file);

    var p = path.extname(file.originalname.toString());
    if (p == ".jpg" || p == ".jpeg") file.mimetype = "image/jpg";
    return file.fieldname + "-" + Date.now() + p;
  }
});

module.exports = storage;
