var mongoose = require('mongoose'); 

var user = mongoose.Schema({
	local            : {
        email        : String,
        name         : String,
        password     : String,
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

module.exports = mongoose.model('user',user);