const connection = require('../config/mysql-db-conection');
const bcryptjs = require('bcryptjs');

module.exports.consultarUsuarios = function(callback){
    //connection.connect();   
    connection.query('SELECT * from usuarios', function (error, results, fields) {
        if (error){
            //throw error;
            callback(error, null);
        } 
        callback(null, results);
    });
    //connection.end();
}


module.exports.validarCorreoUsuario = function(email, callback){
    connection.query("SELECT idusuario,nombres,apellidos,foto, email,password,foto, estado FROM usuarios WHERE email = '" + email +"'", function (error, results, fields) {
        if (error){
            callback(error, null);
        } 
        callback(null, results);
    });  
}


module.exports.validarPassAuth = function(candidatePasword, hash, callback){
    bcryptjs.compare(candidatePasword,hash, (error, isMatch) => {
        if (error){
            callback(error, null);
        } 
        callback(null, isMatch);
    });
}

