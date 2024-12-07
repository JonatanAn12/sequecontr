const express = require("express");
const { crearUsuario, obtenerUsuarios } = require("../controllers/loginController");

const router = express.Router();

router.post("/login", crearUsuario);
router.get("/login", obtenerUsuarios);

module.exports = router;