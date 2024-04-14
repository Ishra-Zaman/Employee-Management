require('dotenv').config();

module.exports = {
    DB_NAME: process.env.DB_DATABASE,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DIALECT: process.env.DB_DIALECT,
    
    DB_NAME_PROD: process.env.DB_DATABASE_PROD,
    DB_HOST_PROD: process.env.DB_HOST_PROD,
    DB_PORT_PROD: process.env.DB_PORT_PROD,
    DB_USERNAME_PROD: process.env.DB_USER_PROD,
    DB_PASSWORD_PROD: process.env.DB_PASSWORD_PROD,
    DB_DIALECT_PROD: process.env.DB_DIALECT_PROD,
    DB_SSL_PROD: process.env.DB_SSL_PROD
}