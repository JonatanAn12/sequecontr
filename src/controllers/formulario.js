const usuario = require('../models/usuario');

//* Crear usuario
exports.crearUsuario = async (req, res) => {
    const { nombre, ciudad, cedula, correo } = req.body;

    if (!nombre || !ciudad || !cedula || !correo) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        const nuevoUsuario = await usuario.create({ nombre, ciudad, cedula, correo });
        res.status(201).json({ message: 'Usuario agregado', usuario: nuevoUsuario });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al agregar el usuario' });
    }
};

//* Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

//* Obtener usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'El ID debe ser un número válido' });
    }

    try {
        const usuarioEncontrado = await usuario.findByPk(id);

        if (!usuarioEncontrado) {
            return res.status(404).json({ error: `Usuario con ID ${id} no encontrado` });
        }

        res.json(usuarioEncontrado);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: 'Error interno al obtener usuario' });
    }
};

//* Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, ciudad, cedula, correo } = req.body;

    if (!nombre || !ciudad || !cedula || !correo) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        const [updatedRows] = await usuario.update({ nombre, ciudad, cedula, correo }, { where: { id } });
        if (!updatedRows) return res.status(404).json({ error: 'Usuario no encontrado' });

        res.json({ message: 'Usuario actualizado', id });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
};

//* Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRows = await usuario.destroy({ where: { id } });
        if (!deletedRows) return res.status(404).json({ error: 'Usuario no encontrado' });

        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
};