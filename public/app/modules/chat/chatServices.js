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
		addMessage : function(data,who){
			messages.push({data:data,who:who})
		},
		getMessages: function(){
			return messages
		}
	}
	
}])


module.exports = chatService;