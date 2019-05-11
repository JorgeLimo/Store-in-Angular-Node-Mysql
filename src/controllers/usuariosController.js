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

exports.encriptarTest = (req, res) => {
    const contrasenia = req.body.contrasenia;
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(contrasenia, salt, (err, hash) => {
            if(err) throw err;
            res.json({
                estado  : true,
                contrasenia : contrasenia,
                hash : hash
            })
        });
    });
}

exports.validarLogin = (req, res) => {

    /// recibe : {correo : "jorge.limo@ourlimm.com", contrasenia : "123"} 
    const correoAPI = req.body.correo;
    const contraseniaAPI = req.body.contrasenia;

    var usuario = {
        email : correoAPI,
        password : contraseniaAPI
    } 

    if(correoAPI == "" || correoAPI == undefined){
        res.json({
            estado : false,
            mensaje : "Ingrese un correo valido.",
        });
    }else{

        //Obtener un usuario por su email
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
                //validar si la contraseña del usuario es la correcta
                // contraseniaAPI == result[0]['password']  / isMatch true
                // contraseniaAPI != result[0]['password']  / isMatch false
                usuarios.validarPassAuth(contraseniaAPI, result[0]['password'], function (err, isMatch){

                    if (err){ res.status(200).json({ estado  : false, mensaje : "Ocurrio un error intentelo nuevamente", sistema : err.message});} 
                    
                    if(isMatch){
                        //global.secret = public.key / private.key
                        const token = jwt.sign({data: result[0]['idusuario']}, globals.secret, {
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


}