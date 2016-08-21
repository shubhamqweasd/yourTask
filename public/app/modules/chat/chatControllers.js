
var chatServices = require('./chatServices')
var chatModule = angular.module('app.chat.controllers',[chatServices.name])

chatModule.controller('chatController',['$scope','$http','Chat','$state','Auth',function($scope,$http,Chat,$state,Auth){

	if(Chat.getSocket() == false){
		Chat.setSocket()
		console.log('SOCKET REGISTERED')
	}
	var user = Auth.getUsername()

	$scope.send = function(msg){
		if(msg != '' && msg != null && msg != undefined){
			Chat.getSocket().emit('chat',{name:user,message:msg})
			$scope.msg = ''
		}
	}

	Chat.getSocket().on('chat', function(data){
		messageElement = document.getElementById('messages')
		angular.element(messageElement).append('<div class="bubble you"><h4>'+data.message+'</h4><h5> : '+data.name+'</h5></div>')
   		messageElement.scrollTop = messageElement.scrollHeight - messageElement.clientHeight;
	});

}])


module.exports = chatModule;