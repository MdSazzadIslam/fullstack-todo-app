const redis = require("redis");
require("dotenv").config();
const logger = require("../helpers/logger");

const connectRedis = () => {
  try {
    const client = redis.createClient(
      process.env.REDIS_PORT,
      process.env.REDIS_HOST
    );
    client.on("connect", () => {
      logger.info("Successfully connected to redis");
    });
    return client;
  } catch (e) {
    logger.error("Error while connecting to Redis.");
  }
};

module.exports = connectRedis;
