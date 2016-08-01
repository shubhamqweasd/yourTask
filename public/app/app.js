// Material design css
require('angular-material/angular-material.css')
// Icons
require('font-awesome/css/font-awesome.css')
//custom css
require('./styles/custom.css')

var angular  = require('angular')
var uirouter = require('angular-ui-router')
var angularAnimate = require('angular-animate')
var angularMaterial = require('angular-material')

//controllers dependencies
var authModule = require('./modules/auth/authControllers')
var dashModule = require('./modules/dash/dashControllers')


var app = angular.module('app',[uirouter,angularMaterial,angularAnimate,dashModule.name,authModule.name]);

//config routes
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //set up the states
  $stateProvider
    .state('login', {
      url: "/login",
      template: require('./modules/auth/login.html'),
      controller: 'loginController'
    })
    .state('signup', {
      url: "/signup",
      template: require('./modules/auth/register.html'),
      controller: 'signupController'
    })
    .state('dashboard', {
      url: "/",
      template: require('./modules/dash/dash.html'),
      controller: 'dashController',
      resolve:{
        authenticated:['$q', 'Auth', function ($q, Auth) {
            var deferred = $q.defer();
            Auth.checkUser().success(function(res) {
                if (res.success) {
                    Auth.setUser(res.data)
                    deferred.resolve();
                } else {
                    deferred.reject('AUTH_FALSE');
                }
            });
            return deferred.promise;
        }]
      }
    })
}]);

app.run(['$rootScope', '$location', 'Auth','$state', function ($rootScope, $location, Auth, $state) {
    $rootScope.$on('$stateChangeError', function (evt,current,previous,rejection) {
      if(current.url = "/"){
        $state.go('login')
      }
    });

}]);

app.controller('navController',['$scope','$http','$location','Auth',function($scope,$http,$location,Auth){
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

}])

