"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _multer = _interopRequireDefault(require("multer"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// method used to create hashed
const tmpFolder = _path.default.resolve(__dirname, "..", "..", "tmp");

var _default = {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: _path.default.resolve(tmpFolder, "uploads"),
  multer: {
    storage: _multer.default.diskStorage({
      destination: tmpFolder,

      filename(request, file, callback) {
        // here we are going to hash the filename, so it doesn't not occur of two users uploading a file with the same name
        const fileHash = _crypto.default.randomBytes(10).toString("hex");

        const fileName = `${fileHash}-${file.originalname}`;
        return callback(null, fileName);
      }

    })
  },
  config: {
    disk: {},
    aws: {
      bucket: "me.fernandobraga.app-gobarber"
    }
  }
};
exports.default = _default;