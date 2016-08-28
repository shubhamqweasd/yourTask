var taskServices = require('./taskServices')
var taskModule = angular.module('app.task.controllers',[taskServices.name])

taskModule.controller('taskController',['$scope','$http','Task','$state','$mdDialog',function($scope,$http,Task,$state,$mdDialog){
	
	$scope.addTask = function(ev) {
	    $mdDialog.show({
	      controller: 'DialogController',
	      templateUrl: 'addTask.html', //embedded in task.html
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true
	    })
	}

}])

taskModule.controller('DialogController',['$scope','$http','Task','$state',function($scope,$http,Task,$state){
	
	$scope.newTask = {}
	// setup for expiry date datepicker//
	$scope.today = new Date()
	$scope.minDate = new Date(
      $scope.today.getFullYear(),
      $scope.today.getMonth(),
      $scope.today.getDate());
  	$scope.maxDate = new Date(
      $scope.today.getFullYear(),
      $scope.today.getMonth() + 2,
      $scope.today.getDate());
  	
  	$scope.submitTask = function(){
  		Task.addTask($scope)
	}

	$scope.getAssignEmails = function(query){
		return Task.getAssignEmails(query)
	}

}])


module.exports = taskModule;