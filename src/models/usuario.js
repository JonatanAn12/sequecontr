const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const usuario = sequelize.define('usuario', {
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
    tableName: 'usuario',
    timestamps: false, //* Deshabilitar createdAt/updatedAt si no están en tu tabla
});

module.exports = usuario;