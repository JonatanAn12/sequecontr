const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const { crearUsuario } = require('../controllers/loginController');

const formulario = sequelize.define('login', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "usuario", 
    },
}, {
    tableName: 'login',
    timestamps: false, //* Deshabilitar createdAt/updatedAt si no están en tu tabla
});
crearUsuario
module.exports = formulario;