const bcrypt = require('bcrypt'); // Para encriptar y comparar contraseñas
const jwt = require('jsonwebtoken'); // Para generar el JWT
const Login = require('../models/login'); // Modelo de la tabla login
const Registro = require('../models/registro'); // Modelo de la tabla registro si es necesario

// Función para iniciar sesión
exports.iniciarSesion = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    // Buscar el usuario en la base de datos
    const usuarioEncontrado = await Login.findOne({ where: { usuario_id: usuario } });
    
    if (!usuarioEncontrado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Comparar la contraseña ingresada con la almacenada (encriptada)
    const contrasenaValida = await bcrypt.compare(contraseña, usuarioEncontrado.contraseña_id);
    
    if (!contrasenaValida) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: usuarioEncontrado.id, usuario: usuarioEncontrado.usuario_id, rol: usuarioEncontrado.rol },
      process.env.JWT_SECRET || 'secreto', // Usa una clave secreta más segura en producción
      { expiresIn: '1h' } // El token expirará en 1 hora
    );

    // Devolver el token y los datos del usuario
    res.status(200).json({ 
      message: 'Inicio de sesión exitoso', 
      token: token, 
      usuario: usuarioEncontrado.usuario_id,
      rol: usuarioEncontrado.rol
    });

  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

// Función para verificar el token JWT
exports.verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  // Verificar el token JWT
  jwt.verify(token, process.env.JWT_SECRET || 'secreto', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    req.userId = decoded.id;
    req.userRole = decoded.rol;
    next();
  });
};
