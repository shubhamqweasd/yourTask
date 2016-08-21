var dashServices = require('./dashServices')
var dashModule = angular.module('app.dash.controllers',[dashServices.name])

dashModule.controller('dashController',['$scope','$http','Dash','$state',function($scope,$http,Dash,$state){
	
	$scope.go = function(where){
		$state.go(where)
	}

	//navbar animation js
	var menu = document.querySelector('.nav__list');
	var burger = document.querySelector('.burger');


	var openMenu = function() {
	burger.classList.toggle('burger--active');
	menu.classList.toggle('nav__list--active');
	};

	burger.addEventListener('click', openMenu, false);

}])


module.exports = dashModule;