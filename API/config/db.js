const dotenv = require("dotenv");
const { Client, Pool } = require("pg");

dotenv.config();

const connectDB = async () => {
  try {
    const client = new Client({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    });

    await client.connect();

    console.log("Connected to database");
    
    await client.end();

  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
};

module.exports = connectDB;
