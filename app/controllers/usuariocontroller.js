const db = require('../config/db.config.js'); 
const Usuario = db.Usuario;

exports.create = (req, res) => {
    let usuario = {};

    try {
        usuario.id_usuario=req.body.id_usuario;
        usuario.nombre = req.body.nombre;
        usuario.correo = req.body.correo;
        usuario.contraseña = req.body.contraseña;
        usuario.fecha_registro = req.body.fecha_registro;

        Usuario.create(usuario).then(result => {
            res.status(200).json({
                message: "Usuario creado con id = " + result.id_usuario,
                usuario: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el usuario!",
            error: error.message
        });
    }
};

exports.retrieveAllUsuarios = (req, res) => {
    Usuario.findAll()
        .then(usuarioInfos => {
            res.status(200).json({
                message: "Usuarios obtenidos con éxito",
                usuarios: usuarioInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener los usuarios!",
                error: error
            });
        });
};

exports.getUsuarioById = (req, res) => {
    let usuarioId = req.params.id;
    Usuario.findByPk(usuarioId)
        .then(usuario => {
            res.status(200).json({
                message: "Usuario obtenido con id = " + usuarioId,
                usuario: usuario
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener el usuario con id!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);
    
        if (!usuario) {
            res.status(404).json({
                message: "No se encontró el usuario para actualizar con id = " + usuarioId,
                usuario: "",
                error: "404"
            });
        } else {    
            let updatedObject = {
                nombre: req.body.nombre,
                correo: req.body.correo,
                contraseña: req.body.contraseña,
                fecha_registro: req.body.fecha_registro
            };
            let result = await Usuario.update(updatedObject, { returning: true, where: { id_usuario: usuarioId } });
            
            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar un usuario con id = " + usuarioId,
                    error: "No se pudo actualizar el usuario",
                });
            }

            res.status(200).json({
                message: "Usuario actualizado con id = " + usuarioId,
                usuario: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar un usuario con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No existe el usuario con id = " + usuarioId,
                error: "404",
            });
        } else {
            await usuario.destroy();
            res.status(200).json({
                message: "Usuario eliminado con id = " + usuarioId,
                usuario: usuario,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar un usuario con id = " + req.params.id,
            error: error.message,
        });
    }
};

