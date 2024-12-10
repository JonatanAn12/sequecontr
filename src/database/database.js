require('dotenv').config();
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
  process.env.DB_NAME,       //* Nombre de la base de datos
  process.env.DB_USER,       //* Usuario de la base de datos
  process.env.DB_PASSWORD,   //* Contraseña de la base de datos
  {
    host: process.env.DB_HOST,   //* Dirección del host (por ejemplo, localhost)
    port: process.env.DB_PORT,   //* Puerto del servidor de base de datos
    dialect: 'mysql',            //* O cualquier base de datos que estés usando
    logging: false,              //* Para evitar que Sequelize imprima logs (opcional)
  }
);


sequelize.sync({ alter: true })
    .then(() => console.log('Modelos sincronizados con la base de datos.'))
    .catch(err => console.error('Error al sincronizar modelos:', err));


module.exports = sequelize;
