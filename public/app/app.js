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
var chatModule = require('./modules/chat/chatControllers')
var navModule = require('./modules/nav/nav')


var app = angular.module('app',[uirouter,angularMaterial,angularAnimate,chatModule.name,navModule.name,dashModule.name,authModule.name]);

//config routes
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/dash");
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
      url: "/dash",
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
    .state('dashboard.chat', {
      url: "/chat",
      template: require('./modules/chat/chat.html'),
      controller: 'chatController',
      resolve:{
        authenticated:['$q', 'Auth', function ($q, Auth) {
            var deferred = $q.defer();
            Auth.checkUser().success(function(res) {
                if (res.success) {
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
      $state.go('login')
    });

}]);

