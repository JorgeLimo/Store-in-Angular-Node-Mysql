const express = require('express'); //IMPORTANTE EXPRESS
const cors = require('cors');
const passport = require('passport'); 
var morgan = require('morgan')
const globals = require('./src/config/globals'); // CONSTANTES DEL SISTEMA

//Init expressJS
const app = express();

//Get routes files
const usuariosRoutes = require('./src/routes/usuarios');

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares (Body Parse ya viene integrado en express 4.6.+)
app.use(cors());
app.use(express.json()); // para que el servidor reciba los JSON en una peticion
app.use(express.urlencoded({extended : false}));
// requisito para que funcione
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("combined"));

//Passport
require('./src/config/passport')(passport);


///AGREGAR RUTAS AL EXPRESS
app.use('/api/usuarios', usuariosRoutes);    



//Start Server
app.listen(app.get('port'),() => {
    console.log('Env : ' + globals.domain + ' Server on port ' + app.get('port'));
});
