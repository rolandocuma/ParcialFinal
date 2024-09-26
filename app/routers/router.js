const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariocontroller.js');
const proyectosController = require('../controllers/proyectocontroller.js');
const tareasController = require('../controllers/tareacontroller.js');

router.post('/api/usuarios/create', usuariosController.create);
router.get('/api/usuarios/all', usuariosController.retrieveAllUsuarios);
router.get('/api/usuarios/onebyid/:id', usuariosController.getUsuarioById);
router.put('/api/usuarios/update/:id', usuariosController.updateById);
router.delete('/api/usuarios/delete/:id', usuariosController.deleteById);

router.post('/api/proyectos/create', proyectosController.create);
router.get('/api/proyectos/all', proyectosController.retrieveAllProyectos);
router.get('/api/proyectos/onebyid/:id', proyectosController.getProyectoById);
router.put('/api/proyectos/update/:id', proyectosController.updateById);
router.delete('/api/proyectos/delete/:id', proyectosController.deleteById);

router.post('/api/tareas/create', tareasController.create);
router.get('/api/tareas/all', tareasController.retrieveAllTareas);
router.get('/api/tareas/onebyid/:id', tareasController.getTareaById);
router.put('/api/tareas/update/:id', tareasController.updateById);
router.delete('/api/tareas/delete/:id', tareasController.deleteById);



module.exports = router;
