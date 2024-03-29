const { v4: uuidv4 } = require("uuid");
const { Pool } = require("pg");
const dotenv = require("dotenv");

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

const getAllEmployees = async (req, res) => {
    try {
      const employees = await pool.query(`SELECT e.id, e.first_name, e.last_name, e.email_address, e.phone, e.address, e.salary, coalesce(d.name,'N/A')as designation_name 
      FROM employee as e
      LEFT JOIN designation as d
      ON d.id = e.designation_id
      ORDER BY e.updated_at desc;`);
  
      res.json(employees.rows);
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  };

  const getEmployeeById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if this id exists in the database
      const employeeExists = await pool.query(
        "SELECT id FROM employee WHERE id = $1",
        [id]
      );
      if (employeeExists.rows.length === 0) {
        res.status(404).json({ message: "Employee not found" });
      }
  
      const employee = await pool.query(
        `SELECT e.id, e.first_name, e.last_name, e.email_address, e.phone, e.address, e.salary, d.id as designation_id, coalesce(d.name,'N/A')as designation_name 
        FROM employee as e
        LEFT JOIN designation as d
        ON d.id = e.designation_id
        WHERE e.id = $1;`,
        [id]
      );
  
      res.json(employee.rows[0]);
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  };

  const createEmployee = async (req, res) => {
    try {
      const { first_name, last_name, email_address, phone, address, salary, designation_id} = req.body;
  
      const newEmployee = await pool.query(
        "INSERT INTO employee (id, first_name, last_name, email_address, phone, address, salary, designation_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", 
        [uuidv4(), first_name, last_name, email_address, phone, address, salary, designation_id]
      );
  
      res.json(newEmployee.rows[0]);
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  };

 const updateEmployee = async (req, res) => {
    try {
      const { id } = req.params;
      const { first_name, last_name, address, email_address, phone, salary, designation_id } = req.body;  
      const employeeExists = await pool.query("SELECT * FROM employee WHERE id = $1", [id]);
      if (employeeExists.rows.length === 0) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      const updatedEmployee = await pool.query(
        "UPDATE employee SET first_name = $1, last_name = $2, address = $3, email_address = $4, phone = $5, salary = $6, designation_id = $7, updated_at = NOW() WHERE id = $8 RETURNING *",
        [first_name, last_name, address, email_address, phone, salary, designation_id, id]
      );
  
      res.json(updatedEmployee.rows[0]);
    } catch (err) {
      console.error(`Error: ${err.message}`);
      res.status(500).json({ message: "Internal Server Error" });
    }
};

  
  const deleteEmployee = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if this id exists in the database
      const employeeExists = await pool.query(
        "SELECT id FROM employee WHERE id = $1",
        [id]
      );
      if (employeeExists.rows.length === 0) {
        res.status(404).json({ message: "Employee not found" });
      }
  
      await pool.query("DELETE FROM employee WHERE id = $1", [id]);
  
      res.json({ message: "Employee deleted successfully" });
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  };

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
  };