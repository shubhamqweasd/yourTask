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

taskModule.controller('DialogController',['$scope','$http','Task','$state','$mdDialog','$q',function($scope,$http,Task,$state,$mdDialog,$q){
	
	$scope.newTask = {}
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

		if($scope.newTask.priority == undefined || $scope.newTask.priority == ''){
			$scope.err = "Please set a priority"
		}
		if($scope.newTask.expires_on == undefined || $scope.newTask.expires_on == ''){
			$scope.err = "Please set an expiry date for this task"
		}
		if($scope.newTask.assigned_to == null){
			$scope.err = "Please assign this task to a valid user"
		}
	}

	$scope.getAssignEmails = function(query){
		var def = $q.defer()

		$http.get('/task/assign/'+query).success(function(data){
			def.resolve(data.data)
		})

		return def.promise
	}

}])


module.exports = taskModule;