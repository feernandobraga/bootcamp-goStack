"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rateLimiter;

var _rateLimiterFlexible = require("rate-limiter-flexible");

var _redis = _interopRequireDefault(require("redis"));

var _AppError = _interopRequireDefault(require("../../../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// to prevent API requests abuse and store the data with Redis
// to use redis
const redisClient = _redis.default.createClient({
  // instantiate Redis
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined //will only require a password in development mode

});

const limiter = new _rateLimiterFlexible.RateLimiterRedis({
  // instantiate the rateLimiter
  storeClient: redisClient,
  keyPrefix: "ratelimit",
  points: 5,
  //number of API calls within a time frame
  duration: 1 // 1 second

});

async function rateLimiter(request, response, next) {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (err) {
    throw new _AppError.default("Too many requests, 429");
  }
}