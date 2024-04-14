const Employee = require("../models/employee");
const Designation = require("../models/designation");
const {
  isErrorAForeignKeyViolation,
  displayValidationErrorMessages,
} = require("../utils/utils");


const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      order: [["updated_at", "DESC"]],
    });
    res.status(200).json(employees);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({ message: "Failed to retrieve Get All Employees" });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);

    if (employee === undefined || employee === null) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({ message: "Failed to retrive Get Employee By Id" });
  }
};

const createEmployee = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email_address,
      phone,
      address,
      salary,
      designation_id,
    } = req.body;
    const newEmployee = await Employee.create({
      first_name,
      last_name,
      email_address,
      phone,
      address,
      salary,
      designation_id,
    });

    res
      .status(201)
      .json({
        message: "Employee created successfully",
        employee: newEmployee,
      });
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      const messages = displayValidationErrorMessages(err.errors);
      console.error(`Validation Error: ${messages}`);
      res.status(400).json({ messages });
    } else {
      console.error(`Error: ${err.message}`);
      const isForeignKeyViolation = isErrorAForeignKeyViolation(err.message);
      const message = isForeignKeyViolation
        ? "Unable to create employee since it's already tied up with a designation"
        : "Unable to create employee";
      res.status(500).json({ message });
    }
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      email_address,
      phone,
      address,
      salary,
      designation_id,
    } = req.body;

    const employeeExists = await Employee.findByPk(id);
    if (employeeExists === undefined || employeeExists === null) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const updatedEmployee = await Employee.update(
      {
        first_name,
        last_name,
        email_address,
        phone,
        address,
        salary,
        designation_id,
      },
      {
        where: {
          id,
        },
      }
    );

    res.status(200).json({ message: "Employee successfully updated" });
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      const messages = displayValidationErrorMessages(err.errors);
      console.error(`Validation Error: ${messages}`);
      res.status(400).json({ messages });
    } else {
      console.error(`Error: ${err.message}`);
      res
        .status(500)
        .json({
          message: `Unable to update employee due to the following issue: ${err.message}`,
        });
    }
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employeeExists = await Employee.findByPk(id);

    if (employeeExists === undefined || employeeExists === null) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await Employee.destroy({where: {id}});

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    const isForeignKeyViolation = isErrorAForeignKeyViolation(err.message);
    const message = isForeignKeyViolation
      ? "Unable to delete employee since it's already tied up with employee(s)"
      : "Unable to delete the employee";
    res.status(500).json({ message });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
