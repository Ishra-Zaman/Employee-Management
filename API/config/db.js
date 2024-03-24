const dotenv = require("dotenv");
const { Client, Pool } = require("pg");

dotenv.config();

const connectDB = async () => {
  try {
    let dbConnectObject = {
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    }
    if(process.env.NODE_ENV === "production") {
      dbConnectObject = {
        user: process.env.PGUSER_PROD,
        host: process.env.PGHOST_PROD,
        database: process.env.PGDATABASE_PROD,
        password: process.env.PGPASSWORD_PROD,
        port: process.env.PGPORT_PROD,
        ssl: process.env.PGSSL_PROD
      }
    }
    const client = new Client(dbConnectObject);

    await client.connect();

    console.log("Connected to database");
    
    await client.end();

  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
};

module.exports = connectDB;
