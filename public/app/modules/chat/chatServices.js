var chatService = angular.module('app.chat.services',[]);

chatService.factory('Chat',['$http','$location','$rootScope','$state','$mdToast',function($http,$location,$rootScope,$state,$mdToast){

	var socket;
	return {
		setSocket : function(){
			socket = io();
		},
		getSocket : function(){
			return socket || false
		}
	}
	
}])


module.exports = chatService;