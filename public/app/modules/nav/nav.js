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
						    if(data.local) $scope.name = data.local.name
						    if(data.google) $scope.name = data.google.name
						    if(data.facebook) $scope.name = data.facebook.name
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