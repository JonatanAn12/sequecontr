const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Login = sequelize.define('login', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  usuario_id: {
    type: DataTypes.STRING,  // Asegúrate de que sea un STRING si es un nombre de usuario
    allowNull: false,
  },
  contraseña_id: {
    type: DataTypes.STRING,  // La contraseña debe estar en STRING (aunque sea cifrada)
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "usuario",
  },
  cedula: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'login',
  timestamps: false,
});

module.exports = Login;
