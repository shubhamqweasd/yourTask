var authService = angular.module('app.auth.services',[]);

authService.factory('Auth',['$http','$location',function($http,$location){

	//resources
	var loginLocalResource = "/auth/login/local"
	var profileResource = "/auth/profile"
	// user data
	var user = null

	return {
		loginLocal : function(email,password,$scope){
			$http.post(loginLocalResource,{email:email,password:password}).success(function(res){
				if(res.success){
					$location.path('/')
				} else {
					$scope.errorMessage = res.message;
				}
			})
		},
		isAuthorised : function(){
			return user
		},
		setUser : function(userP){
			if(userP){
				user = userP
			} else user = null
		},
		checkUser : function(){
			return $http.get(profileResource)
		}
	}

}])


module.exports = authService;