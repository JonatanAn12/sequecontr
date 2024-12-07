const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const formulario = sequelize.define('formulario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ciudad: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cedula: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'formulario',
    timestamps: false, //* Deshabilitar createdAt/updatedAt si no están en tu tabla
});

module.exports = formulario;