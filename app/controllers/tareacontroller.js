const db = require('../config/db.config.js');
const Tarea = db.Tarea;


exports.create = (req, res) => {
    let tarea = {};

    try {
        tarea.id_proyecto = req.body.id_proyecto;
        tarea.nombre = req.body.nombre;
        tarea.estado = req.body.estado 
        tarea.fecha_creacion = req.body.fecha_creacion 
        tarea.fecha_vencimiento = req.body.fecha_vencimiento;

        Tarea.create(tarea).then(result => {
            res.status(200).json({
                message: "Tarea creada con id = " + result.id_tarea,
                tarea: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear la tarea!",
            error: error.message
        });
    }
};

exports.retrieveAllTareas = (req, res) => {
    Tarea.findAll()
        .then(tareas => {
            res.status(200).json({
                message: "Tareas obtenidas con éxito",
                tareas: tareas
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener las tareas!",
                error: error
            });
        });
};

exports.getTareaById = (req, res) => {
    let tareaId = req.params.id;
    Tarea.findByPk(tareaId)
        .then(tarea => {
            if (tarea) {
                res.status(200).json({
                    message: "Tarea obtenida con id = " + tareaId,
                    tarea: tarea
                });
            } else {
                res.status(404).json({
                    message: "Tarea no encontrada con id = " + tareaId
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener la tarea con id!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let tareaId = req.params.id;
        let tarea = await Tarea.findByPk(tareaId);

        if (!tarea) {
            res.status(404).json({
                message: "No se encontró la tarea para actualizar con id = " + tareaId,
                tarea: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                id_proyecto: req.body.id_proyecto,
                nombre: req.body.nombre,
                estado: req.body.estado,
                fecha_creacion: req.body.fecha_creacion,
                fecha_vencimiento: req.body.fecha_vencimiento
            };

            let result = await Tarea.update(updatedObject, { returning: true, where: { id_tarea: tareaId } });

            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar una tarea con id = " + tareaId,
                    error: "No se pudo actualizar la tarea",
                });
            } else {
                res.status(200).json({
                    message: "Tarea actualizada con id = " + tareaId,
                    tarea: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar una tarea con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let tareaId = req.params.id;
        let tarea = await Tarea.findByPk(tareaId);

        if (!tarea) {
            res.status(404).json({
                message: "No existe la tarea con id = " + tareaId,
                error: "404",
            });
        } else {
            await tarea.destroy();
            res.status(200).json({
                message: "Tarea eliminada con id = " + tareaId,
                tarea: tarea,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar una tarea con id = " + req.params.id,
            error: error.message,
        });
    }
};
