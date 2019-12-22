const multer = require('multer');
const crypto = require('crypto');
const mime = require('mime');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
      });
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      let extention = mime.extension(file.mimetype);
      if (extention == 'png' || extention == 'jpg' || extention == 'jpeg') {
        cb(null, true);
      } else
        cb(null, false)
    },
});

module.exports = upload;