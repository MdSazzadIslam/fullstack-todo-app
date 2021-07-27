"use strict";
require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
const logger = require("./src/helpers/logger");
const connectRedis = require("./src/config/redis");

async function main() {
  await connectDB(process.env.MONGO_URI);
  connectRedis();

  process.on("unhandledRejection", (err) => {
    logger.error(`Unhandled Rejection ${err}`);
  });

  process.on("uncaughtException", (err) => {
    logger.error(`Uncaught Exception ${err}`);
    process.exit(1);
  });

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    res.send("Route not found");
    next(err);
  });

  app.get("/", (req, res) => {
    res.send("API is running");
  });
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    logger.info(`⚡️[server]:  API is running at port :${PORT}  `);
  });
}

main().catch((err) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
});
module.exports = app;
