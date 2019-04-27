const connection = require('../config/mysql-db-conection');

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