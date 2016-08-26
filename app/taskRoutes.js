var router = require('express').Router();
var Task = require('../app/models/task');

module.exports = function(){
	// auth for every request in this module
	router.use(isLoggedIn)

	router.post('/add',function(req,res){
		var newTask = new Task()
		newTask.created_by = 				getEmail(req)
		newTask.created_by.name = 			req.body.name || res.json({success:false,message:'INVALID REQ PARAMETERS'})
		newTask.created_by.type = 			req.body.type || res.json({success:false,message:'INVALID REQ PARAMETERS'})
		newTask.created_by.description = 	req.body.description || res.json({success:false,message:'INVALID REQ PARAMETERS'})
		newTask.created_by.created_on = 	new Date()
		newTask.created_by.expires_on = 	req.body.expires_on || res.json({success:false,message:'INVALID REQ PARAMETERS'})
		newTask.created_by.priority = 		req.body.priority || res.json({success:false,message:'INVALID REQ PARAMETERS'})
		newTask.created_by.assigned_to = 	req.body.assigned_to || res.json({success:false,message:'INVALID REQ PARAMETERS'})
		newTask.created_by.status = 		'NEW'
		newTask.save(function(err){
			if(!err) res.json({success:true})
				else res.json({success:false,message:err})
		})
	})

	return router
}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    res.json({success:false,message:"NOT AUTHORISED"});
}

function getEmail(req){
	if(req.user.local) return req.user.local.email
	if(req.user.google) return req.user.google.email
	if(req.user.facebook) return req.user.facebook.email
}