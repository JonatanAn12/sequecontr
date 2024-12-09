const express = require("express");
const loginRoutes = require("../controllers/loginController");

const router = express.Router();

router.post("/login", loginRoutes.crearUsuario);
router.get("/login", loginRoutes.obtenerUsuarios);

module.exports = router;
