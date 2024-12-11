const bcrypt = require('bcrypt');
const Registro = require('../models/registro');  //* Asegúrate de que la ruta sea correcta
const jwt = require('jsonwebtoken');
require('dotenv').config();

//* Registrar nuevo usuario
exports.registrarUsuario = async (request, response) => {
  try {
 
    const { cedula, nombre, email, usuario, password, rol } = request.body;

    //* Validar que los campos no estén vacíos
    if (!cedula || !nombre || !email || !usuario || !password || !rol) {
      return response.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    //* Verificar si el usuario ya existe
    const usuarioExistente = await Registro.findOne({ where: { usuario } });
    if (usuarioExistente) {
      return response.status(400).json({ message: 'El nombre de usuario ya está registrado' });
    }

    //* Verificar si el correo electrónico ya está registrado
    const emailExistente = await Registro.findOne({ where: { email } });
    if (emailExistente) {
      return response.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    //* Verificar si la cédula ya está registrada
    const cedulaExistente = await Registro.findOne({ where: { cedula } });
    if (cedulaExistente) {
      return response.status(400).json({ message: 'La cédula ya está registrada' });
    }

    //* Cifrar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10); //* 10 es el número de rondas de sal

    //* Crear el nuevo registro de usuario
    const nuevoUsuario = await Registro.create({
      cedula,
      nombre,
      email,
      usuario,
      password: hashedPassword,  //* Guardamos la contraseña cifrada
      rol
    });

    //* Crear el token JWT para el usuario
    const token = jwt.sign(
      { id: nuevoUsuario.id, rol: nuevoUsuario.rol },
      process.env.JWT_SECRET,  //* Asegúrate de que JWT_SECRET esté definido en tu archivo .env
      { expiresIn: '1h' }
    );

    //* Enviar la respuesta con el token
    response.status(201).json({
      message: 'Usuario registrado exitosamente',
      token
    });

  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    response.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
};
