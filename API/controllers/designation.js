const { v4: uuidv4 } = require("uuid");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const {isErrorAForeignKeyViolation} = require("../utils/utils")

dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

const getAllDesignations = async (req, res) => {
  try {
    const designations = await pool.query("SELECT * FROM designation");

    res.json(designations.rows);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
};

const getDesignationById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if this id exists in the database
    const designationExists = await pool.query(
      "SELECT * FROM designation WHERE id = $1",
      [id]
    );
    if (designationExists.rows.length === 0) {
      res.status(404).json({ message: "Designation not found" });
    }

    const designation = await pool.query(
      "SELECT * FROM designation WHERE id = $1",
      [id]
    );

    res.json(designation.rows[0]);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
};

const createDesignation = async (req, res) => {
  try {
    const { name } = req.body;

    const newDesignation = await pool.query(
      "INSERT INTO designation (id, name) VALUES ($1, $2) RETURNING *",
      [uuidv4(), name]
    );

    res.json(newDesignation.rows[0]);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
};

const updateDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    // Check if this id exists in the database
    const designationExists = await pool.query(
      "SELECT * FROM designation WHERE id = $1",
      [id]
    );
    if (designationExists.rows.length === 0) {
      res.status(404).json({ message: "Designation not found" });
    }

    const updatedDesignation = await pool.query(
      "UPDATE designation SET name = $1, status = $2 WHERE id = $3 RETURNING *",
      [name, status, id]
    );

    res.json(updatedDesignation.rows[0]);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
};

const deleteDesignation = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if this id exists in the database
    const designationExists = await pool.query(
      "SELECT * FROM designation WHERE id = $1",
      [id]
    );
    if (designationExists.rows.length === 0) {
      res.status(404).json({ message: "Designation not found" });
    }

    await pool.query("DELETE FROM designation WHERE id = $1", [id]);

    res.json({ message: "Designation deleted successfully" });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    const isForeignKeyViolation = isErrorAForeignKeyViolation(err.message);
    let message = isForeignKeyViolation ? "Unable to delete designation since it's already tide up with employee(s)" : err.message;
    res.status(500).json({message: message}) //@TODO: have to add this to all API functions so we can see error message back.
  }
};

module.exports = {
  createDesignation,
  getAllDesignations,
  getDesignationById,
  updateDesignation,
  deleteDesignation,
};

// Test