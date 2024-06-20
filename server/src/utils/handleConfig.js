const { config } = require("dotenv");
config();
module.exports = {
  PORT: process.env.PORT,
  DB_URL_CONNECT: process.env.DB_URL_CONNECT,
  SECRET_TOKEN_KEY: process.env.SECRET_TOKEN_KEY,
};
