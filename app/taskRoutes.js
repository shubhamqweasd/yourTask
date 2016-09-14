var router = require('express').Router();
var Task = require('../app/models/task');
var User = require('../app/models/user');

module.exports = function(){
	// auth for every request in this module
	router.use(isLoggedIn)

	router.post('/add',function(req,res){

		var toValidate = ['name','type','description','expires_on','priority','assigned_to']
		if(validateRequest(toValidate,req)){
			var newTask = new Task()
			newTask.created_by = 	getEmail(req.user)
			newTask.name = 			req.body.name
			newTask.type = 			req.body.type
			newTask.description = 	req.body.description
			newTask.created_on = 	new Date()
			newTask.expires_on = 	req.body.expires_on
			newTask.priority = 		req.body.priority
			newTask.assigned_to = 	req.body.assigned_to
			newTask.status = 		'NEW'
			newTask.save(function(err){
				if(!err) res.json({success:true})
					else res.json({success:false,message:err})
			})
		} else res.json({success:false,message:'INVALID REQ PARAMETERS'})
	})

	router.get('/assign/:who',function(req,res){

		User.find({$or:[{'google.name':new RegExp(req.params.who, 'i')},{'facebook.name':new RegExp(req.params.who, 'i')},{'local.name':new RegExp(req.params.who, 'i')}]},function(err,data){
			var loogedUser = getEmail(req.user)
			data = data.map(function(x){
					return getEmail(x)
			}).filter(function(x){
				return x != loogedUser
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

	router.delete('/delete/:id',function(req,res){
		Task.remove({_id:req.params.id},function(err){
			if(!err) res.json({success:true})
				else res.json({success:false,message:err})
		})
	})

	router.put('/edit/:id',function(req,res){
		delete req.body.created_by
		delete req.body.created_on
		delete req.body.status
		var toValidate = ['name','type','description','expires_on','priority','assigned_to']
		if(validateRequest(toValidate,req)){
			Task.update({_id:req.params.id},req.body,function(err,num){
				if(!err) res.json({success:true,num:num})
					else res.json({success:false,message:err})
			})
		} else res.json({success:false,message:'INVALID REQ PARAMETERS'})
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

function validateRequest(arr,req){
	for(var k in arr){
		if(req.body[arr[k]] == undefined || req.body[arr[k]] == null || req.body[arr[k]] == ''){
			return false
		}
	}
	return true
}
