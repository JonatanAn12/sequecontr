const Login = require("../models/login");

exports.crearUsuario = async (req, res) => {
  try {
    const nuevoUsuario = await Login.create({ usuario, contraseña });
    res.status(201).json({ message: "Usuario creado con éxito", data: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario", error: error.message });
  }
};

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Login.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios", error: error.message });
  }
};


