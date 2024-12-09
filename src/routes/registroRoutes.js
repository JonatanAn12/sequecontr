const express = require('express');
const registroController = require('../controllers/registroController');

const router = express.Router();

// Rutas para los registros
router.post('/registros', registroController.crearRegistro);
router.get('/registros', registroController.obtenerRegistros);
router.get('/registros/:id', registroController.obtenerRegistroPorId);
router.put('/registros/:id', registroController.actualizarRegistro);
router.delete('/registros/:id', registroController.eliminarRegistro);

module.exports = router;
