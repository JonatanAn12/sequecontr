const express = require('express');
const formController = require('../controllers/formulario');

const router = express.Router();

router.post('/usuarios', formController.crearUsuario);
router.get('/usuarios', formController.obtenerUsuarios);
router.get('/usuarios/:id', formController.obtenerUsuarioPorId);
router.put('/usuarios/:id', formController.actualizarUsuario);
router.delete('/usuarios/:id', formController.eliminarUsuario);

module.exports = router;