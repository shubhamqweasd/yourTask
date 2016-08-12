var chatController = require('../chat/chatController')
var dashModule = angular.module('app.dash.controllers',[])

dashModule.controller('dashController',['$scope','$http','$mdDialog',function($scope,$http,$mdDialog){
	$scope.openChat = function(){
		$mdDialog.show({
	      controller: chatController,
	      template: require('../chat/chat.html'),
	      parent: angular.element(document.body),
	      clickOutsideToClose:true
	    })
	}
}])

module.exports = dashModule;