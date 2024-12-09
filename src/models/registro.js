const {DataTypes} = require('sequelize');
const sequelize = require('../database/database');

const Registro = sequelize.define('registro', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
    },
    usuario: {
        type: DataTypes.STRING(225),
        allowNull: false,
    },
    contraseña: {
        type: DataTypes.STRING(225),
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING(225),
        allowNull: false,
    },
    cedula: {
        type: DataTypes.STRING(225),
        allowNull: false,
    },
}, {
    tableName: 'registro',
    timestamps: false,
});

Registro.associate = (models) => {
    Registro.hasMany(models.Login, {
        foreignKey: 'usuario_id',
        sourceKey: 'usuario',
        as: 'login',
    });
};

module.exports = Registro;