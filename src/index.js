const express = require('express');
const sequelize = require('./database/database');
const cors = require('cors');
const usuarioForm = require('./routes/routesForm');
const loginRoutes = require('./routes/loginRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', usuarioForm);
app.use('/api', loginRoutes);

sequelize.sync({ alter: true })
    .then(() => console.log('Modelos sincronizados con la base de datos.'))
    .catch(err => console.error('Error al sincronizar modelos:', err));

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
    console.log(`Servidor en el puerto http://localhost:${PORT}`);
});