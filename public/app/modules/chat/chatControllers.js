
var chatServices = require('./chatServices')
var chatModule = angular.module('app.chat.controllers',[chatServices.name])

chatModule.controller('chatController',['$scope','$http','Chat','$state','Auth',function($scope,$http,Chat,$state,Auth){
	$scope.clients = []
	var user = Auth.getUsername()

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
		Chat.getSocket().emit('newClient',{name:user,time:time})
	})
	
	$scope.send = function(msg){
		if(msg != '' && msg != null && msg != undefined){
			Chat.getSocket().emit('chat',{name:user,message:msg})
			$scope.msg = ''
		}
	}

	Chat.getSocket().on('chat', function(data){
		var who = data.name == user ? 'me' : 'you'
		Chat.appendChat(data,who)
	});

	Chat.getSocket().on('clients',function(data){
		Chat.updateClients(data)
		$scope.clients = Chat.getClients()
		$scope.$apply()
	})

	$scope.$on("$destroy",function(){
		Chat.removeListener('chat')
	})

}])


module.exports = chatModule;