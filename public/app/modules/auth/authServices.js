var authService = angular.module('app.auth.services',[]);

authService.factory('Auth',['$http','$location',function($http,$location){

	//resources
	var loginLocalResource = "/auth/login/local"
	var profileResource = "/auth/profile"
	// user data
	var user = null

	return {
		loginLocal : function(email,password){
			var data = {email:email,password:password}
			$http.post((loginLocalResource),data).success(function(res){

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