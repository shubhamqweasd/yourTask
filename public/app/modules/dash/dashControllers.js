var chatController = require('../chat/chatController')
var dashServices = require('./dashServices')
var dashModule = angular.module('app.dash.controllers',[dashServices.name])

dashModule.controller('dashController',['$scope','$http','$mdDialog','Dash',function($scope,$http,$mdDialog,Dash){
	$scope.openChat = function(){
		if(Dash.getSocket() == false){
			Dash.setSocket()
			console.log('SOCKET REGISTERED')
		}
		$mdDialog.show({
	      controller: chatController,
	      template: require('../chat/chat.html'),
	      parent: angular.element(document.body),
	      clickOutsideToClose:true
	    }).finally(function(){
	    	Dash.getSocket().off('chat')
	    })
	}
}])

module.exports = dashModule;