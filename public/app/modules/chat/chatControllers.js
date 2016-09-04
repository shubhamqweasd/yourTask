
var chatServices = require('./chatServices')
var chatModule = angular.module('app.chat.controllers',[chatServices.name])

chatModule.controller('chatController',['$scope','$http','Chat','$state','Auth',function($scope,$http,Chat,$state,Auth){

	var user = Auth.getUsername()
	var email = Auth.getEmail()
	$scope.clients = []
	$scope.clientListProgress = true
	Chat.setScope($scope)

	// send a message
	$scope.send = function(msg){
		if(msg != '' && msg != null && msg != undefined){
			Chat.getSocket().emit('chat',{name:user,message:msg,email:email})
			$scope.msg = ''
		}
	}

	if(Chat.getSocket() == false){
		Chat.setSocket()
		console.log('SOCKET REGISTERED')
	} else {
		$scope.clients = Chat.getClients()
		Chat.updateChatBox()
	}
	
	if(Chat.checkListener('connect') == -1){
		//register client detail to server
		Chat.getSocket().on('connect',function(){
			var currDate = new Date()
			var time = currDate.getHours()+":"+currDate.getMinutes() 
			Chat.getSocket().emit('newClient',{name:user,time:time,email:email})
		})
		Chat.addListener('connect')
	}
	if(Chat.checkListener('chat') == -1){
		Chat.getSocket().on('chat', function(data){
			var who = data.email == email ? 'me' : 'you'
			Chat.appendChat(data,who)
			Chat.addMessage(data,who)
		})
		Chat.addListener('chat')
	}
	if(Chat.checkListener('clients') == -1){
		Chat.getSocket().on('clients',function(data){
			Chat.getScope().clientListProgress = false
			Chat.updateClients(data)
			Chat.getScope().clients = Chat.getClients()
			Chat.getScope().$apply(function(){
				Chat.getScope().clientListProgress = true
			})
		})
		Chat.addListener('clients')
	}

}])


module.exports = chatModule;