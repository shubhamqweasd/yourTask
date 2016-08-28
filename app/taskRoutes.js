var router = require('express').Router();
var Task = require('../app/models/task');
var User = require('../app/models/user');

module.exports = function(){
	// auth for every request in this module
	router.use(isLoggedIn)

	router.post('/add',function(req,res){
		var newTask = new Task()
		newTask.created_by = 	getEmail(req.user)
		newTask.name = 			req.body.name || res.json({success:false,message:'INVALID REQ PARAMETERS'})
		newTask.type = 			req.body.type || res.json({success:false,message:'INVALID REQ PARAMETERS'})
		newTask.description = 	req.body.description || res.json({success:false,message:'INVALID REQ PARAMETERS'})
		newTask.created_on = 	new Date()
		newTask.expires_on = 	req.body.expires_on || res.json({success:false,message:'INVALID REQ PARAMETERS'})
		newTask.priority = 		req.body.priority || res.json({success:false,message:'INVALID REQ PARAMETERS'})
		newTask.assigned_to = 	req.body.assigned_to || res.json({success:false,message:'INVALID REQ PARAMETERS'})
		newTask.assigned_to = 	req.body.assigned_to == getEmail(req.user) ? 'Myself' : req.body.assigned_to
		newTask.status = 		'NEW'
		newTask.save(function(err){
			if(!err) res.json({success:true})
				else res.json({success:false,message:err})
		})
	})

	router.get('/assign/:who',function(req,res){

		User.find({$or:[{'google.name':new RegExp(req.params.who, 'i')},{'facebook.name':new RegExp(req.params.who, 'i')},{'local.name':new RegExp(req.params.who, 'i')}]},function(err,data){

			data = data.map(function(x){
					return getEmail(x)
			})
			if(!err) res.json({success:true,data:data})
				else res.json({success:false,message:err})
			
		})
	})

	router.get('/assigned',function(req,res){
		Task.find({assigned_to:getEmail(req.user)},function(err,data){
			if(!err) res.json({success:true,data:data})
				else res.json({success:false,message:err})
		})
	})

	router.get('/created',function(req,res){
		Task.find({created_by:getEmail(req.user)},function(err,data){
			if(!err) res.json({success:true,data:data})
				else res.json({success:false,message:err})
		})
	})

	return router
}

function isLoggedIn(req, res, next) {

    //if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    res.json({success:false,message:"NOT AUTHORISED"});
}

function getEmail(which){
	if(JSON.stringify(which.local) != '{}'){
		return which.local.email
	} else if(JSON.stringify(which.google) != '{}') {
		return which.google.email
	} else { 
		return which.facebook.email
	}
}