"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// redis options to strongly type the configuration parameters
// interface to strongly type the export of this configuration file
var _default = {
  driver: "redis",
  config: {
    // configs for redis
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS || undefined //will only require a password in development mode

    }
  }
};
exports.default = _default;