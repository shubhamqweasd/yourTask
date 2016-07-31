var authServices = require('./authServices')
var authModule = angular.module('app.auth.controllers',[ authServices.name ]);

authModule.controller('loginController',['$scope','$http','Auth',function($scope,$http,Auth){

	$scope.submit = function(email,password){
		Auth.loginLocal(email,password,$scope)
	}

}])


module.exports = authModule;