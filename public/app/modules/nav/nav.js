var navModule = angular.module('app.nav.module',[]);

navModule.directive('navBar',[function(){
	return {
		restrict 	: 'E',
		template 	: require('./nav.html'),
		scope	 	: {},
		controller 	: ['$scope','$http','$location','Auth',function($scope,$http,$location,Auth){
						  $scope.isLoggedIn = false;
						  $scope.logoutProgress = false;
						  $scope.redirect = function(where){
						    $location.path(where)
						  }

						  $scope.$on('LOGGED_IN',function(evt,data){
						    $scope.isLoggedIn = true;
						    $scope.name = data
						  })

						  $scope.$on('LOGGED_OUT',function(evt,data){
						    $scope.isLoggedIn = false;
						  })

						  $scope.logout = function(){
						    Auth.logout($scope)
						  }

					}]
	}
}])

module.exports = navModule;