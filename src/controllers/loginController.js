const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Login = require("../models/login");
require("dotenv").config();

//* Iniciar sesión
exports.iniciarSesion = async (request, response) => {
  try {
    const { usuario, password } = request.body;

    //* Validar los datos de entrada
    if (typeof usuario !== "string" || typeof password !== "string") {
      return response.status(400).json({ message: "Usuario y password son requeridos y deben ser cadenas de texto" });
    }

    //* Buscar el usuario en la base de datos
    const usuarioDB = await Login.findOne({ where: { usuario: usuario } });
    if (!usuarioDB) {
      return response.status(404).json({ message: "Credenciales inválidas" });
    }
    //* Verificar la contraseña cifrada
    const contraseñaValida = await bcrypt.compare(password, usuarioDB.password);  //* Comparar la password
    console.log('Contraseña válida:', contraseñaValida);
    if (!contraseñaValida) {
      return response.status(401).json({ message: "Credenciales inválidas" });
    }

    //* Crear el token JWT
    const token = jwt.sign(
      { id: usuarioDB.id, rol: usuarioDB.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    response.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    response.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
};

//* Validar token
exports.validarToken = (request, response) => {
  const token = request.header("Authorization");
  if (!token) {
    return response.status(401).json({ message: "Acceso denegado. No se proporcionó un token." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    response.status(200).json({ message: "Token válido", data: payload });
  } catch (error) {
    console.error("Error al validar token:", error);
    response.status(401).json({ message: "Token no válido", error: error.message });
  }
};
