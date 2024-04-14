const Designation = require('../models/designation')
const { isErrorAForeignKeyViolation, displayValidationErrorMessages } = require("../utils/utils");

const getAllDesignations = async (req, res) => {
  try {
    const designations = await Designation.findAll({
      where: {
        status: 'active'
      },
      order: [
        ['updated_at', 'DESC']
      ]
    })
    res.status(200).json(designations)
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({ message: "Failed to retrieve Get All Designations" });
  }
};

const getDesignationById = async (req, res) => {
  try {
    const { id } = req.params;
    const designation = await Designation.findByPk(id);

    if (designation === undefined || designation === null) {
      return res.status(404).json({ message: "Designation not found" });
    }

    res.json(designation);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({ message: "Failed to retrive Get Designation By Id" });
  }
};

const createDesignation = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const newDesignation = await Designation.create({
      name,
      description,
      status
    })

    res.status(201).json({message: 'Designation created successfully', designation: newDesignation});
  } catch (err) {
    if(err.name === 'SequelizeValidationError') {
      const messages = displayValidationErrorMessages(err.errors);
      console.error(`Validation Error: ${messages}`)
      res.status(400).json({messages})
    } else {
      console.error(`Error: ${err.message}`);
      const isForeignKeyViolation = isErrorAForeignKeyViolation(err.message);
      const message = isForeignKeyViolation
        ? "Unable to create designation since it's already tied up with employee(s)"
        : "Unable to create designation";
      res.status(500).json({ message });
    }
  }
};

const updateDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    const designationExists = await Designation.findByPk(id);
    if (designationExists === undefined || designationExists === null) {
      return res.status(404).json({ message: "Designation not found" });
    }

    const updatedDesignation = await Designation.update({
      name,
      description,
      status
    }, {
      where: {
        id
      }
    });

    res.status(200).json({message: 'Designation successfully updated'});
  } catch (err) {
    if(err.name === 'SequelizeValidationError') {
      const messages = displayValidationErrorMessages(err.errors);
      console.error(`Validation Error: ${messages}`)
      res.status(400).json({messages})
    } else {
      console.error(`Error: ${err.message}`);
      res.status(500).json({ message: `Unable to update designation due to following issue: ${err.message}` });
    }    
  }
};

const deleteDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const designationExists = await Designation.findByPk(id);

    if (designationExists === undefined || designationExists === null) {
      return res.status(404).json({ message: "Designation not found" });
    }

    await Designation.destroy({where: {id}});

    res.status(200).json({ message: "Designation deleted successfully" });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    const isForeignKeyViolation = isErrorAForeignKeyViolation(err.message);
    const message = isForeignKeyViolation
      ? "Unable to delete designation since it's already tied up with employee(s)"
      : "Unable to delete the designation";
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
