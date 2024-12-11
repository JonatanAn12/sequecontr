const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Registro = sequelize.define('registro', {
  cedula: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
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
  },
}, {
  tableName: 'registro',
  timestamps: false,
});

module.exports = Registro;
