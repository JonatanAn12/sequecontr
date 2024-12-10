const bcrypt = require("bcrypt");
const Registro = require("../models/registro");
const Login = require("../models/login");

// Crear un nuevo registro y agregarlo a la tabla login
exports.crearRegistro = async (req, res) => {
  try {
    const { usuario, contraseña, correo, cedula, rol } = req.body;

    // Verificar si el usuario ya está registrado en la tabla registro
    const usuarioExistente = await Registro.findOne({ where: { usuario } });
    if (usuarioExistente) {
      return res.status(400).json({ message: "El usuario ya está registrado" });
    }

    // Verificar si el correo ya está registrado en la tabla registro
    const correoExistente = await Registro.findOne({ where: { correo } });
    if (correoExistente) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Verificar si el usuario ya está registrado en la tabla login
    const usuarioLoginExistente = await Login.findOne({ where: { usuario_id: usuario } });
    if (usuarioLoginExistente) {
      return res.status(400).json({ message: "El usuario ya existe en la tabla de login" });
    }

    // Cifrar la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Crear un nuevo registro en la tabla 'registro'
    const nuevoRegistro = await Registro.create({
      usuario,
      contraseña: hashedPassword,
      correo,
      cedula,
      rol,
    });

    // Enviar los datos del nuevo registro a la tabla 'login'
    const nuevoLogin = await Login.create({
      usuario_id: nuevoRegistro.usuario,
      contraseña_id: nuevoRegistro.contraseña,
      rol: nuevoRegistro.rol,
      cedula: nuevoRegistro.cedula,
    });

    res.status(201).json({ message: "Registro y login creados con éxito", data: nuevoRegistro });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el registro", error: error.message });
  }
};

// Obtener todos los registros
exports.obtenerRegistros = async (req, res) => {
  try {
    const registros = await Registro.findAll();
    res.status(200).json(registros);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los registros", error: error.message });
  }
};

// Obtener un registro por ID
exports.obtenerRegistroPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await Registro.findByPk(id);

    if (!registro) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.status(200).json(registro);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el registro", error: error.message });
  }
};

// Actualizar un registro
exports.actualizarRegistro = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario, contraseña, correo, cedula, rol } = req.body;

    const registro = await Registro.findByPk(id);
    if (!registro) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    // Verificar si el correo está en uso por otro registro
    if (correo && correo !== registro.correo) {
      const correoExistente = await Registro.findOne({ where: { correo } });
      if (correoExistente) {
        return res.status(400).json({ message: "El correo ya está registrado" });
      }
    }

    // Actualizar el registro
    const hashedPassword = contraseña ? await bcrypt.hash(contraseña, 10) : registro.contraseña;

    await registro.update({ usuario, contraseña: hashedPassword, correo, cedula, rol });

    res.status(200).json({ message: "Registro actualizado con éxito", data: registro });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el registro", error: error.message });
  }
};

// Eliminar un registro
exports.eliminarRegistro = async (req, res) => {
  try {
    const { id } = req.params;

    const registro = await Registro.findByPk(id);
    if (!registro) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    // Eliminar el registro
    await registro.destroy();

    res.status(200).json({ message: "Registro eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el registro", error: error.message });
  }
};
