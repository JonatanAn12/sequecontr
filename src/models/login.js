const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Login = sequelize.define('login', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  usuario: {
    type: DataTypes.STRING,  
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,  
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
