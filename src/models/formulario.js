const { DataTypes } = require('sequelize');
const sequelize = require('../database/database'); 

const formulario = sequelize.define('formulario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ciudad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cedula: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'formulario',
  timestamps: false,
});

module.exports = formulario;
