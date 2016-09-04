var chatService = angular.module('app.chat.services',[]);

chatService.factory('Chat',['$http','$location','$rootScope','$state','$mdToast',function($http,$location,$rootScope,$state,$mdToast){

	var socket
	var clients = []
	var messages = []
	var listeners = []
	var scope

	return {
		setScope : function(sc){
			scope = sc
		},
		getScope : function(){
			return scope
		},
		setSocket : function(){
			socket = io();
		},
		getSocket : function(){
			return socket || false
		},
		killSocket : function(){
			this.removeListener('chat')
			socket.disconnect()
			socket = false
			clients = []
			messages = []
			listeners = []
		},
		addListener : function(which){
			listeners.push(which)
		},
		removeListener : function(which){
			socket.off(which)
		},
		checkListener : function(which){
			return listeners.indexOf(which)
		},
		updateClients : function(newClients){
			clients = newClients
		},
		getClients: function(){
			return clients
		},
		appendChat: function(data,who){
			messageElement = document.getElementById('messages')
			if(messageElement){
				angular.element(messageElement).append('<div class="bubble '+who+'"><h4>'+data.message+'</h4><h5> : '+data.name+'</h5></div>')
		   		messageElement.scrollTop = messageElement.scrollHeight - messageElement.clientHeight;
		   	}
		},
		addMessage : function(data,who){
			messages.push({data:data,who:who})
		},
		getMessages: function(){
			return messages
		},
		updateChatBox : function(){
			for(var k in messages){
				this.appendChat(messages[k].data,messages[k].who)
			}
		}
	}
	
}])


module.exports = chatService;