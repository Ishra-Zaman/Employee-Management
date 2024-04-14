const Sequelize = require('sequelize')
const db = require('../config/database');
const { v4: uuidv4 } = require("uuid");
const Employee = require('../models/employee')

const Designation = db.define("designation", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            min: 3,
            max: 255,
            notNull: true,
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "active",
        validate: {
            min: 6,
            max: 8,
            notNull: true,
            notEmpty: true
        }
    },
    created_at: {
        type: Sequelize.DATE,
        field: 'created_at',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
        type: Sequelize.DATE,
        field: 'updated_at',
    }
}, {timestamps: false, underscored: true, tableName: 'designation'})

//Designation.belongsTo(Employee, {foreignKey: 'id'})
// Designation.associate = (models) => {
//     models.belongsTo(Employee, {foreignKey: 'id'}) 
//    }
Designation.beforeCreate((dsg) => dsg.id = uuidv4());

module.exports = Designation;