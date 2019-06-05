var GridFSStorage  = require('multer-gridfs-storage');
var MongoClient = require('mongodb');
var url = process.env.FileDB_URL || 'mongodb://fakhrad:logrezaee24359@ds231537.mlab.com:31537/files'
var storage = undefined;
storage = new GridFSStorage({ url: url, cache : true });

module.exports = storage;

