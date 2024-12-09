const Registro = require('../models/registro'); // Asegúrate de ajustar la ruta al archivo del modelo de Registro

// Crear un nuevo registro
exports.crearRegistro = async (req, res) => {
  try {
    const { usuario, contraseña, correo, cedula } = req.body;

    // Crear el nuevo registro en la base de datos
    const nuevoRegistro = await Registro.create({
      usuario,
      contraseña,
      correo,
      cedula,
    });

    res.status(201).json({ message: "Registro creado con éxito", data: nuevoRegistro });
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
    const { usuario, contraseña, correo, cedula } = req.body;

    const registro = await Registro.findByPk(id);
    if (!registro) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    // Actualizar el registro
    await registro.update({ usuario, contraseña, correo, cedula });

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
