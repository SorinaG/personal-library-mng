const dotenv = require("dotenv");
dotenv.config()

module.exports = {
  port: process.env.PORT,
  app: process.env.APP,
  env: process.env.NODE_ENV,
  secret: process.env.JWT_SECRET,
  hostname: process.env.HOSTNAME,
}