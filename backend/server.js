"use strict";
require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
const logger = require("./src/helpers/logger");

async function main() {
  (() => {
    connectDB(process.env.MONGO_URI);
  })();

  process.on("uncaughtException", (err) => {
    logger.error(`Uncaught Exception ${err}`);
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
