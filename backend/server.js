"use strict";
require("dotenv").config();
const app = require("./src/app");
const connect = require("./src/config/db");
const logger = require("./src/helpers/logger");

(async () => {
  await connect(process.env.MONGO_URI);
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

module.exports = app;
