const usuarios = require('../models/usuariosModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const globals = require('../config/globals'); // CONSTANTES DEL SISTEMA


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


exports.validarLogin = (req, res) => {

    const correoAPI = req.body.correo;
    const contraseniaAPI = req.body.contrasenia;

    var usuario = {
        email : correoAPI,
        password : contraseniaAPI
    } 

    usuarios.validarCorreoUsuario(correoAPI, function (err, result){
        if (err){
            res.json({ estado  : false, mensaje : "Ocurrio un error intentelo nuevamente", level : 0, sistema : err.message});
        } 

        if(result.length == 0){
            res.json({
                estado : false,
                mensaje : "El correo " + correoAPI + " no se encuentra en el sistema",
            })
        }else{
            usuarios.validarPassAuth(contraseniaAPI, result[0]['password'], function (err, isMatch){
                if (err){ res.status(200).json({ estado  : false, mensaje : "Ocurrio un error intentelo nuevamente", sistema : err.message});} 
                if(isMatch){
                    
                    const token = jwt.sign({data: result[0]}, globals.secret, {
                        expiresIn: 604800 //Week
                    });
                    
                    res.json({
                        estado : true,
                        mensaje : "Bienvenido al sistema",
                        token: `Bearer ${token}`,
                        usuario : result
                    })
                }else{
                    res.json({
                        estado : false,
                        mensaje : "La contraseña ingresada para el correo " + correoAPI + " no es la correcta.",
                    })

                }
            });


        }
        

        
    })
    




}