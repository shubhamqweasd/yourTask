var chatService = angular.module('app.chat.services',[]);

chatService.factory('Chat',['$http','$location','$rootScope','$state','$mdToast',function($http,$location,$rootScope,$state,$mdToast){

	var socket;
	var clients = []
	return {
		setSocket : function(){
			socket = io();
		},
		getSocket : function(){
			return socket || false
		},
		removeListener : function(which){
			socket.off(which)
		},
		updateClients : function(newClients){
			clients = newClients
		},
		getClients: function(){
			return clients
		},
		appendChat: function(data,who){
			messageElement = document.getElementById('messages')
			angular.element(messageElement).append('<div class="bubble '+who+'"><h4>'+data.message+'</h4><h5> : '+data.name+'</h5></div>')
	   		messageElement.scrollTop = messageElement.scrollHeight - messageElement.clientHeight;
		}
	}
	
}])


module.exports = chatService;