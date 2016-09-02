
var chatServices = require('./chatServices')
var chatModule = angular.module('app.chat.controllers',[chatServices.name])

chatModule.controller('chatController',['$scope','$http','Chat','$state','Auth',function($scope,$http,Chat,$state,Auth){
	$scope.clients = []
	$scope.clientListProgress = true
	var user = Auth.getUsername()
	var email = Auth.getEmail()

	if(Chat.getSocket() == false){
		Chat.setSocket()
		console.log('SOCKET REGISTERED')
	} else {
		$scope.clients = Chat.getClients()
	}
	
	//register client detail to server
	Chat.getSocket().on('connect',function(){
		var currDate = new Date()
		var time = currDate.getHours()+":"+currDate.getMinutes() 
		Chat.getSocket().emit('newClient',{name:user,time:time,email:email})
	})
	
	$scope.send = function(msg){
		if(msg != '' && msg != null && msg != undefined){
			Chat.getSocket().emit('chat',{name:user,message:msg,email:email})
			$scope.msg = ''
		}
	}

	Chat.getSocket().on('chat', function(data){
		var who = data.email == email ? 'me' : 'you'
		Chat.appendChat(data,who)
	});

	Chat.getSocket().on('clients',function(data){
		$scope.clientListProgress = false
		Chat.updateClients(data)
		$scope.clients = Chat.getClients()
		$scope.$apply(function(){
			$scope.clientListProgress = true
		})
	})

	$scope.$on("$destroy",function(){
		Chat.removeListener('chat')
	})

}])


module.exports = chatModule;