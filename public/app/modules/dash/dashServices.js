var dashService = angular.module('app.dash.services',[]);

dashService.factory('Dash',['$http','$location','$rootScope','$state','$mdToast',function($http,$location,$rootScope,$state,$mdToast){

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


module.exports = dashService;