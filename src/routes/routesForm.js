const express = require('express');
const router = express.Router();
const formController = require('../controllers/formulario');

router.post('/usuarios', formController.crearUsuario);
router.get('/usuarios', formController.obtenerUsuarios);
router.get('/usuarios/:id', formController.obtenerUsuarioPorId);
router.put('/usuarios/:id', formController.actualizarUsuario);
router.delete('/usuarios/:id', formController.eliminarUsuario);

module.exports = router;