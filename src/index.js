const express = require('express');
const sequelize = require('./database/database');
const usuario = require('./models/usuario'); 
const cors = require('cors');

const app = express();
app.use(cors()); 
app.use(express.json());


//* Sincronizar modelos con la base de datos
sequelize.sync({ alter: true })
    .then(() => console.log('Modelos sincronizados con la base de datos.'))
    .catch(err => console.error('Error al sincronizar modelos:', err));

//* Crear usuario
app.post('/api/usuarios', async (request, response) => {
  const { nombre, ciudad, cedula, correo } = request.body;

  if (!nombre || !ciudad || !cedula || !correo) {
      return response.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
      const nuevoUsuario = await usuario.create({ nombre, ciudad, cedula, correo });
      response.status(201).json({ message: 'Usuario agregado', usuario: nuevoUsuario });
  } catch (error) {
      console.error('Error al crear usuario:', error);
      response.status(500).json({ error: 'Error al agregar el usuario' });
  }
});

// *Obtener todos los usuarios
app.get('/api/usuarios', async (request, response) => {
    try {
        const usuarios = await usuario.findAll();
        response.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        response.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

//* Obtener usuario por ID
app.get('/api/usuarios/:id', async (request, response) => {
    const { id } = request.params;

    if (isNaN(id)) {
        return response.status(400).json({ error: 'El ID debe ser un número válido' });
    }

    try {
        const usuarioEncontrado = await usuario.findByPk(id);

        if (!usuarioEncontrado) {
            return response.status(404).json({ error: `Usuario con ID ${id} no encontrado` });
        }

        response.json(usuarioEncontrado);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        response.status(500).json({ error: 'Error interno al obtener usuario' });
    }
});

//* Actualizar usuario
app.put('/api/usuarios/:id', async (request, response) => {
    const { id } = request.params;
    const { nombre, ciudad, cedula, correo } = request.body;

    if (!nombre || !ciudad || !cedula || !correo) {
        return response.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        const [updatedRows] = await usuario.update({ nombre, ciudad, cedula, correo }, { where: { id } });
        if (!updatedRows) return response.status(404).json({ error: 'Usuario no encontrado' });

        response.json({ message: 'Usuario actualizado', id });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        response.status(500).json({ error: 'Error al actualizar usuario' });
    }
});

//* Eliminar usuario
app.delete('/api/usuarios/:id', async (request, response) => {
    const { id } = request.params;

    try {
        const deletedRows = await usuario.destroy({ where: { id } });
        if (!deletedRows) return response.status(404).json({ error: 'Usuario no encontrado' });

        response.json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        response.status(500).json({ error: 'Error al eliminar usuario' });
    }
});

//* Levantar el servidor
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
    console.log(`Servidor en el puerto http://localhost:${PORT}`);
});