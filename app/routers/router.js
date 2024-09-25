const express = require('express');
const router = express.Router();



const usuariosController = require('../controllers/usuariocontroller.js');

router.post('/api/usuarios/create', usuariosController.create);
router.get('/api/usuarios/all', usuariosController.retrieveAllUsuarios);
router.get('/api/usuarios/onebyid/:id', usuariosController.getUsuarioById);
router.put('/api/usuarios/update/:id', usuariosController.updateById);
router.delete('/api/usuarios/delete/:id', usuariosController.deleteById);

module.exports = router;
