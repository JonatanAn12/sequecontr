const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Registro = require('./registro'); // Asegúrate de tener el modelo de registro correctamente definido

const Login = sequelize.define('login', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    usuario_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,  // Esta es la referencia, en este caso al usuario de la tabla registro
    },
    contraseña_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Asegúrate de que la contraseña también esté definida correctamente
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

// Definir la relación con la tabla 'registro', suponiendo que 'usuario_id' hace referencia al campo 'cedula' en 'registro'
Login.belongsTo(Registro, { foreignKey: 'usuario_id', targetKey: 'usuario' });  // Cambia 'cedula' si el campo correcto es otro

module.exports = Login;
