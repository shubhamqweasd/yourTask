var LocalStrategy   = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../app/models/user');
var bcrypt   = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // LOCAL LOGIN STRATEGY
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { 

        User.findOne({ 'local.email' :  email }, function(err, user) {

            if (err)
                return done(err);

            if (!user)
                return done(null, false , {message:"INVALID EMAIl/PASSWORD"})

            if (!bcrypt.compareSync(password, user.local.password))
                return done(null, false , {message:"INVALID EMAIl/PASSWORD"})

            // all is well, return successful user
            return done(null, user);
        });
    }));


    // GOOGLE AUTH STRATEGY
    passport.use(new GoogleStrategy({

    clientID        : "588172686298-pu55l2kld3m65bjqj2fdp7kblf73410k.apps.googleusercontent.com",
    clientSecret    : "pK6PTup9_TGKDFThapbK73JP",
    callbackURL     : "http://localhost:3000/auth/google/callback",

	},
	function(token, refreshToken, profile, done) {

	    // make the code asynchronous
	    process.nextTick(function() {
	        // try to find the user based on their google id
	        User.findOne({ 'google.id' : profile.id }, function(err, user) {
	            if (err)
	                return done(err);

	            if (user) {
	                return done(null, user);
	            } else {
	              
	                var newUser	= new User();
	                // set all of the relevant information
	                newUser.google.id    = profile.id;
	                newUser.google.token = token;
	                newUser.google.name  = profile.displayName;
	                newUser.google.email = profile.emails[0].value; // pull the first email

	                // save the user
	                newUser.save(function(err) {
	                    if (err)
	                        throw err;
	                    return done(null, newUser);
	                });
	            }
	        });
	    });

	}));



}