module.exports = (sequelize, Sequelize) => {
    const Proyecto = sequelize.define("proyecto", {
        id_proyecto: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        id_usuario: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        nombre: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        descripcion: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        fecha_creacion: {
            type: Sequelize.DATE,
        }
    });

    return Proyecto;
};
