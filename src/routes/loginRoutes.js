const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

//* Ruta para el inicio de sesión
router.post('/login', loginController.iniciarSesion);

//* Ruta para la validación de token
router.get('/validar-token', loginController.validarToken);

module.exports = router;
