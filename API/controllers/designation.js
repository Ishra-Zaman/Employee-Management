const { v4: uuidv4 } = require("uuid");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const { isErrorAForeignKeyViolation } = require("../utils/utils");

dotenv.config();

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

const pool = new Pool(dbConnectObject);

const getAllDesignations = async (req, res) => {
  try {
    let query = "SELECT * FROM designation";
    const designations = await pool.query("SELECT * FROM designation WHERE status = 'active' ORDER BY updated_at DESC");
    res.json(designations.rows);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDesignationById = async (req, res) => {
  try {
    const { id } = req.params;
    const designation = await pool.query("SELECT * FROM designation WHERE id = $1", [id]);

    if (designation.rows.length === 0) {
      return res.status(404).json({ message: "Designation not found" });
    }

    res.json(designation.rows[0]);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createDesignation = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newDesignation = await pool.query(
      "INSERT INTO designation (id, name, description) VALUES ($1, $2, $3) RETURNING *",
      [uuidv4(), name, description]
    );

    res.json(newDesignation.rows[0]);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    const isForeignKeyViolation = isErrorAForeignKeyViolation(err.message);
    const message = isForeignKeyViolation
      ? "Unable to create designation since it's already tied up with employee(s)"
      : "Internal Server Error";
    res.status(500).json({ message });
  }
};

const updateDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    const designationExists = await pool.query("SELECT * FROM designation WHERE id = $1", [id]);
    if (designationExists.rows.length === 0) {
      return res.status(404).json({ message: "Designation not found" });
    }

    const updatedDesignation = await pool.query(
      "UPDATE designation SET name = $1, description = $2, status = $3, updated_at = NOW() WHERE id = $4 RETURNING *",
      [name, description, status, id]
    );

    res.json(updatedDesignation.rows[0]);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const designationExists = await pool.query("SELECT * FROM designation WHERE id = $1", [id]);

    if (designationExists.rows.length === 0) {
      return res.status(404).json({ message: "Designation not found" });
    }

    await pool.query("DELETE FROM designation WHERE id = $1", [id]);

    res.json({ message: "Designation deleted successfully" });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    const isForeignKeyViolation = isErrorAForeignKeyViolation(err.message);
    const message = isForeignKeyViolation
      ? "Unable to delete designation since it's already tied up with employee(s)"
      : "Internal Server Error";
    res.status(500).json({ message });
  }
};

module.exports = {
  createDesignation,
  getAllDesignations,
  getDesignationById,
  updateDesignation,
  deleteDesignation,
};
