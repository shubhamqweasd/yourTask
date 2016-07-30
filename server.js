var express = require('express');
var app = express();
var port = process.env.PORT || 3000; 
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
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json

//============ session and passport ============//
app.use(session({ secret: 'yourTaskSecret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// ========== passport config ========= //
require('./config/passport')(passport)

// ============ Routes =========== //
app.use('/auth',require('./app/authRoutes')(passport))



app.listen(port, function () {
  console.log('Example app listening on port ----  '+ port);
});