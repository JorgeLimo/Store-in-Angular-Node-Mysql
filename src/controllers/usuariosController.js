const usuarios = require('../models/usuariosModel');

exports.obtenerUsuarios = (req,res) => {

    usuarios.consultarUsuarios(function(err,response){
        if (err){ res.status(500).json({ estado  : false, mensaje : "Ocurrio un error intentelo nuevamente", sistema : err.message});} 
        res.status(200).json({
                                estado: true,
                                mensaje: "Usuarios",
                                usuarios : response
                            });
    });

}   