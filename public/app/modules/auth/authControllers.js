var authServices = require('./authServices')
var authModule = angular.module('app.auth.controllers',[ authServices.name ]);

authModule.controller('loginController',['$scope','$http','Auth','$location','$mdToast',function($scope,$http,Auth,$location,$mdToast){
	if($location.search().exists){
		$mdToast.show($mdToast.simple().textContent("USER ALREADY EXISTS"));
	}
	$scope.wait = false;
	$scope.submit = function(email,password){
		Auth.loginLocal(email,password,$scope)
	}

}])

authModule.controller('signupController',['$scope','$http','Auth',function($scope,$http,Auth){
	$scope.wait = false;
	$scope.submit = function(name,email,password,passwordConfirm){
		Auth.signupLocal(name,email,password,passwordConfirm,$scope)
	}

}])


module.exports = authModule;