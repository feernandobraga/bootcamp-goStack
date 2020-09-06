"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _mime = _interopRequireDefault(require("mime"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import the provider interface
// import fs and path and upload config to be able to deal with files
// identify the filetype
// to handle s3 storage
class DiskStorageProvider {
  constructor() {
    this.client = void 0;
    this.client = new _awsSdk.default.S3({
      region: "ap-southeast-2"
    });
  }

  async saveFile(file) {
    const originalPath = _path.default.resolve(_upload.default.tmpFolder, file); // get the path to the file locally


    const ContentType = _mime.default.getType(originalPath);

    if (!ContentType) {
      throw new Error("File not found");
    }

    const fileContent = await _fs.default.promises.readFile(originalPath); // read the file on the disk

    await this.client.putObject({
      Bucket: _upload.default.config.aws.bucket,
      //bucket name on ACS
      Key: file,
      // file name
      ACL: "public-read",
      // permissions for that file
      Body: fileContent,
      // the actual content of the file
      ContentType,
      ContentDisposition: `inline; filename=${file}`
    }).promise(); // we use .promise() so we wait for it to finish

    await _fs.default.promises.unlink(originalPath);
    return file;
  }

  async deleteFile(file) {
    await this.client.deleteObject({
      Bucket: _upload.default.config.aws.bucket,
      //bucket name on ACS
      Key: file //file name

    }).promise();
  }

}

var _default = DiskStorageProvider;
exports.default = _default;