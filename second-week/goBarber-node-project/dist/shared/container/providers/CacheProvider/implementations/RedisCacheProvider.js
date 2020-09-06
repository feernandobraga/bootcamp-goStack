"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cache = _interopRequireDefault(require("../../../../../config/cache"));

var _ioredis = _interopRequireDefault(require("ioredis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import the interface
// contains the configurations to instantiate a connection with redis database
// to handle Redis operations/requests
class RedisCacheProvider {
  constructor() {
    this.client = void 0;
    this.client = new _ioredis.default(_cache.default.config.redis); // gets configs like port, host and password from configuration file
  }

  async save(key, value) {
    await this.client.set(key, JSON.stringify(value)); // redis saves stuff as key:value pair
  }

  async recover(key) {
    const data = await this.client.get(key); // retrieve the key-pair from redis based on a given key

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data); // parses the data to whatever type was attributed to the method recover in the service

    return parsedData;
  }

  async invalidate(key) {
    // delete a key from redis
    await this.client.del(key);
  }

  async invalidatePrefix(prefix) {
    // delete all key-value pairs based on a given prefix
    const keys = await this.client.keys(`${prefix}:*`); // retrieve all keys for a given prefix

    const pipeline = this.client.pipeline(); // create a pipeline for deletion just because pipelines have a better performance

    keys.forEach(key => {
      pipeline.del(key); // use pipeline to delete all keys starting with the given prefix
    });
    await pipeline.exec(); // execute the pipeline
  }

}

exports.default = RedisCacheProvider;