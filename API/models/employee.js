const Sequelize = require('sequelize')
const db = require('../config/database');
const { v4: uuidv4 } = require("uuid");
const Designation = require("../models/designation");

const Employee = db.define("employee", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            min: 3,
            max: 100,
            notNull: true,
            notEmpty: true
        }
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            min: 3,
            max: 100,
            notNull: true,
            notEmpty: true
        }
    },
    email_address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            min: 3,
            max: 100,
            notNull: true,
            notEmpty: true
        }
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    salary: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        validate: {
            min: 0,
            max: 9999999999999.99,
            notNull: true,
            notEmpty: true
        }
    },    
    designation_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
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
}, {timestamps: false, underscored: true, tableName: 'employee'})


Employee.beforeCreate((emp) => emp.id = uuidv4());

// Employee.associate = (models) => {
//     Employee.belongsTo(models.id, {foreignKey: 'designation_id', as: 'Designation'});
// };

module.exports = Employee;
