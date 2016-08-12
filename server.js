var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var database = require('./config/database');
var morgan = require('morgan');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session      = require('express-session');


//============= app level middlewares ================ //
mongoose.connect(database.localUrl); 	// Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({'extended': true})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(express.static('public'));
app.use(express.static('/fonts'));

//============ session and passport ============//
app.use(session({ secret: 'yourTaskSecret',resave: true,
    saveUninitialized: true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// ========== passport config ========= //
require('./config/passport')(passport)


//========socket io chat module routes and middlewares===========//
require('./app/chatRoutes')(io)

// ============ Routes =========== //
app.use('/auth',require('./app/authRoutes')(passport))


server.listen(port, server_ip_address, function () {
  console.log( "App running on " + server_ip_address + ":" + port )
});