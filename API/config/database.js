const { Sequelize } = require("sequelize");
require("dotenv").config();
const {
  DB_NAME,
  DB_HOST,
  DB_USERNAME,
  DB_PORT,
  DB_PASSWORD,
  DB_DIALECT,
  DB_NAME_PROD,
  DB_HOST_PROD,
  DB_PORT_PROD,
  DB_USERNAME_PROD,
  DB_PASSWORD_PROD,
  DB_DIALECT_PROD,
  DB_SSL_PROD,
} = require("./index");

if (process.env.NODE_ENV === "production") {
  module.exports = new Sequelize(
    DB_NAME_PROD,
    DB_USERNAME_PROD,
    DB_PASSWORD_PROD,
    {
      host: DB_HOST_PROD,
      dialect: DB_DIALECT_PROD,
      dialectOptions: {
        ssl: {
          require: DB_SSL_PROD,
          rejectUnauthorized: false
        }
      },
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
    }
  );
} else {
  module.exports = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  });
}
