const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();
// Ruta para iniciar sesión
router.post('/login', loginController.iniciarSesion);
// Ruta para verificar el token JWT (protegida)
router.get('/verificar-token', loginController.verificarToken, (req, res) => {
  res.status(200).json({ message: 'Token válido', userId: req.userId, userRole: req.userRole });
});

module.exports = router;
