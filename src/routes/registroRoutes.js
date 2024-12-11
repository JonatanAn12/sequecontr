const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registroController');

//* Ruta para registrar un nuevo usuario
router.post('/registro', registroController.registrarUsuario);

module.exports = router;
