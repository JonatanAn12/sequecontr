const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('crud', 'root', 'Js25112005-', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => console.log('Conexión con Sequelize exitosa.'))
    .catch(err => console.error('Error al conectar con Sequelize:', err));

module.exports = sequelize;