var authService = angular.module('app.auth.services',[]);

authService.factory('Auth',['$http','$location','$rootScope','$state',function($http,$location,$rootScope,$state){

	//resources
	var loginLocalResource = "/auth/login/local"
	var signupLocalResource = "/auth/signup/local"
	var profileResource = "/auth/profile"
	var logoutResource = "/auth/logout"
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
		signupLocal : function(name,email,password,passwordConfirm,$scope){
			if(password == passwordConfirm){
				$http.post(signupLocalResource,{name:name,email:email,password:password}).success(function(res){
					if(res.success){
						this.loginLocal(email,password,$scope)
					} else {
						$scope.errorMessage = res.message;
						$scope.name =''
						$scope.email =''
						$scope.password = ''
						$scope.passwordConfirm = ''
					}
				}.bind(this))
			} else {
				$scope.errorMessage = "PASSWORD DO NOT MATCH"
				$scope.password = ''
				$scope.passwordConfirm = ''
			}
		},
		isAuthorised : function(){
			return user
		},
		setUser : function(userP){
			if(userP){
				user = userP
				$rootScope.$broadcast('LOGGED_IN',user)
			} else user = null
		},
		checkUser : function(){
			return $http.get(profileResource)
		},
		logout : function(){
			$http.get(logoutResource).success(function(res){
				if(res.success){
					user = null
					$rootScope.$broadcast('LOGGED_OUT',user)
					$state.go('login')
				}
			})
		}
	}

}])


module.exports = authService;