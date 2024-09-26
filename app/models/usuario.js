module.exports = (sequelize, Sequelize) => {

    const Usuario = sequelize.define("usuario", {
        id_usuario: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        correo: {
            type: Sequelize.STRING
        },
        contraseña: {
            type: Sequelize.STRING
        },

        fecha_registro: {
            type: Sequelize.DATE
        }
    });

    return Usuario;
};
