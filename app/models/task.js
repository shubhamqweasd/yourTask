var mongoose = require('mongoose'); 

var task = mongoose.Schema({
    name            : String,
    type            : String,
    description     : String,
    created_on      : Date,
    expires_on      : Date,
    priority        : String,
    created_by      : String,
    assigned_to     : String,
    status          : String
});

module.exports = mongoose.model('task',task);