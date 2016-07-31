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
      controller: 'loginController',
      resolve:{
        authenticated:['$q', 'Auth', function ($q, Auth) {
            var deferred = $q.defer();
            Auth.checkUser().success(function(res) {
                if (res.success) {
                    deferred.reject('AUTH_TRUE_REJECT_LOGIN');
                } else {
                    deferred.resolve();
                }
            });
            return deferred.promise;
        }]
      }

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

app.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$on('$stateChangeError', function (evt,current,previous,rejection) {
      if(current.url = "/"){
        window.location.href = '/#/login'
      } else {
        window.location.href = '/'
      }

    });

}]);

