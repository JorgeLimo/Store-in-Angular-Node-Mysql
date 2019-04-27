const express = require('express');
const router = express.Router();

const UsuariosController = require('../controllers/usuariosController');


router.get('/', UsuariosController.obtenerUsuarios);
router.get('/listar', UsuariosController.obtenerUsuarios);

module.exports = router;


