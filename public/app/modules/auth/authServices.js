var authService = angular.module('app.auth.services',[]);

authService.factory('Auth',['$http','$location','$rootScope','$state','$mdToast','Chat','$q',function($http,$location,$rootScope,$state,$mdToast,Chat,$q){

	//resources
	var loginLocalResource = "/auth/login/local"
	var signupLocalResource = "/auth/signup/local"
	var profileResource = "/auth/profile"
	var logoutResource = "/auth/logout"
	// user data
	var user = null

	return {
		loginLocal : function(email,password,$scope){
			$scope.wait = true
			$http.post(loginLocalResource,{email:email,password:password}).success(function(res){
				if(res.success){
					$scope.wait = false;
					$state.go('dashboard')
				} else {
					$scope.wait = false;
					$mdToast.show($mdToast.simple().textContent(res.message));
					$scope.password =''
					$scope.email =''
					//$scope.errorMessage = res.message;
				}
			})
		},
		signupLocal : function(name,email,password,passwordConfirm,$scope){
			$scope.wait = true
			if(password == passwordConfirm){
				$http.post(signupLocalResource,{name:name,email:email,password:password}).success(function(res){
					if(res.success){
						this.loginLocal(email,password,$scope)
					} else {
						$scope.wait = false;
						$mdToast.show($mdToast.simple().textContent(res.message));
						//$scope.errorMessage = res.message;
						$scope.name =''
						$scope.email =''
						$scope.password = ''
						$scope.passwordConfirm = ''
					}
				}.bind(this))
			} else {
				$scope.wait = false;
				$mdToast.show($mdToast.simple().textContent("PASSWORD DO NOT MATCH"));
				//$scope.errorMessage = "PASSWORD DO NOT MATCH"
				$scope.password = ''
				$scope.passwordConfirm = ''
			}
		},
		isAuthorised : function(){
			return user != null
		},
		getUsername : function(){
			if(user){
				if(user.local) return user.local.name
				if(user.google) return user.google.name
				if(user.facebook) return user.facebook.name
			} else {
				return false
			}
		},
		getEmail : function(){
			if(user){
				if(user.local) return user.local.email
				if(user.google) return user.google.email
				if(user.facebook) return user.facebook.email
			} else {
				return false
			}
		},
		setUser : function(userP){
			if(userP){
				user = userP
				$rootScope.$broadcast('LOGGED_IN',this.getUsername())
			} else user = null
		},
		checkUser : function(){
			return $http.get(profileResource)
		},
		authenticate : function(){
			var deferred = $q.defer();
            this.checkUser().success(function(res) {
                if (res.success) {
                    this.setUser(res.data)
                    deferred.resolve();
                } else {
                    deferred.reject('AUTH_FALSE');
                }
            }.bind(this));
            return deferred.promise;
		},
		logout : function($scope){
			$scope.logoutProgress = true
			Chat.killSocket()
			$http.get(logoutResource).success(function(res){
				if(res.success){
					$scope.logoutProgress = false
					user = null
					$rootScope.$broadcast('LOGGED_OUT',user)
					$state.go('login')
				}
			})
		}
	}

}])


module.exports = authService;