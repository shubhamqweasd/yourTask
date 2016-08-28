var taskServices = require('./taskServices')
var taskModule = angular.module('app.task.controllers',[taskServices.name])

taskModule.controller('taskController',['$scope','$http','Task','$state','$mdDialog','$q',function($scope,$http,Task,$state,$mdDialog,$q){
	
	$scope.cards = []
	$scope.addTask = function(ev) {
	    $mdDialog.show({
	      controller: 'DialogController',
	      templateUrl: 'addTask.html', //embedded in task.html
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true
	    })
	}

	function updateCards(){
		$q.all([Task.getAssigned(),Task.getCreated()]).then(function(data){
			$scope.cards = data.reduce(function(arr,x){
				for(var k in x.data.data){
					arr.push(x.data.data[k])
				}
				return arr 
			},[])
		})
	}
	updateCards()

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