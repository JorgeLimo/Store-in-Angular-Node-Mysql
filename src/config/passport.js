const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/globals');

module.exports = function(passport){

    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();//EXTRAER EL TOKEN DE LA CABEZA
    opts.secretOrKey = keys.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
       /**Cliente.getClienteById(jwt_payload.data._id, (err, cliente) => {
            if(err){
                return done(err, false);
            }
            if(cliente){
                return done(null, cliente);
            }else{
                return done(null, false);                
            }
        });**/
        console.log(jwt_payload.data._id);
    }));
}
