const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/globals');

module.exports = function(passport){

    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();//EXTRAER EL TOKEN DE LA CABEZA DE LA PETICION
    opts.secretOrKey = keys.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => { ///Jwtpayload = valor del token desencriptado / done = callback
       /**
        * usuarios.traerDatosdeUsuarioByiD(jwt_payload.data, function (err, result){
         if(err){
                return done(err, false);
            }
            if(cliente){
                return done(null, result[0]);
            }else{
                return done(null, false);                
        * });
        * **/
        console.log(jwt_payload.data);
    }));
}
