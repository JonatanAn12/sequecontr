const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Login = require("../models/login");
require('dotenv').config();

exports.iniciarSesion = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    // Buscar el usuario en la tabla login
    const usuarioDB = await Login.findOne({ where: { usuario_id: usuario } }); // Revisa si 'usuario_id' es el nombre correcto del campo
    if (!usuarioDB) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar la contraseña
    const contraseñaValida = await bcrypt.compare(contraseña, usuarioDB.contraseña_id); // Asegúrate que 'contraseña_id' sea el campo correcto
    if (!contraseñaValida) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Crear el token JWT
    const token = jwt.sign(
      { id: usuarioDB.id, rol: usuarioDB.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
};

exports.validarToken = (req, res) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. No se proporcionó un token." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: "Token válido", data: payload });
  } catch (error) {
    res.status(401).json({ message: "Token no válido", error: error.message });
  }
};
