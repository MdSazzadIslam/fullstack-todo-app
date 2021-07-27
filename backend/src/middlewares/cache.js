const logger = require("../helpers/logger");
const connectRedist = require("../config/redis");
//const cache = connectRedist();

const cacheCheck = (req, res, next) => {
  const key = generateCacheKey(req.query.page, req.query.limit);
  connectRedist().get(key, (err, data) => {
    if (err) {
      throw err;
    } else {
      // Check cached data is exist.
      if (data != null) {
        // Send cached data.
        logger.info(`[getTodos]Response is sent from cache with key: ${key}`);
        res.status(200).send(JSON.parse(data));
      } else {
        // If there is no cached data then let leave the caching to the
        // final controller function.
        logger.info(
          `[getTodos]Response is not sent from cache with key: ${key}`
        );
        next();
      }
    }
  });
};

const cacheCommonCheck = (req, res, next) => {
  const key = generateCommonCacheKey(req.params.searchBy);
  connectRedist().get(key, (err, data) => {
    if (err) {
      throw err;
    } else {
      // Check cached data is exist.
      if (data != null) {
        // Send cached data.
        logger.info(
          `[getTodoByParams]Response is sent from cache with key: ${key}`
        );
        res.status(200).send(JSON.parse(data));
      } else {
        // If there is no cached data then let leave the caching to the
        // final controller function.
        logger.info(
          `[getTodoByParams]Response is not sent from cache with key: ${key}`
        );
        next();
      }
    }
  });
};

const generateCacheKey = (page, limit) => {
  return `${page}_${limit}`;
};

const generateCommonCacheKey = (key) => {
  return `${key}`;
};

module.exports = {
  cacheCheck,
  cacheCommonCheck,
  generateCacheKey,
  generateCommonCacheKey,
};
