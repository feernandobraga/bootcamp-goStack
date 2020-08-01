// redis options to strongly type the configuration parameters
import { RedisOptions } from "ioredis";

// interface to strongly type the export of this configuration file
interface ICacheConfig {
  driver: "redis";

  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: "redis",

  config: {
    // configs for redis
    redis: {
      host: "localhost",
      port: 6379,
      password: undefined, //will only require a password in development mode
    },
  },
} as ICacheConfig;
