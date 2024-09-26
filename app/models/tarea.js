module.exports = (sequelize, Sequelize) => {
    const Tarea = sequelize.define("tarea", {
        id_tarea: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        id_proyecto: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        nombre: {
            type: Sequelize.STRING(100),

        },
        estado: {
            type: Sequelize.STRING,

        },
        fecha_creacion: {
            type: Sequelize.DATE,

        },
        fecha_vencimiento: {
            type: Sequelize.DATE,
          
        }
    });

    return Tarea;
};
