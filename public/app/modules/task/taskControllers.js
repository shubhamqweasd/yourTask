var taskServices = require('./taskServices')
var taskModule = angular.module('app.task.controllers',[taskServices.name])

taskModule.controller('taskController',['$scope','$http','Task','$state','$mdDialog','$q','Auth',function($scope,$http,Task,$state,$mdDialog,$q,Auth){
	$scope.user = Auth.getEmail()
	$scope.cards = []
	Task.updateCards($scope)

	$scope.delete = function(id){
		Task.deleteTask(id,$scope)
	}

	$scope.addTask = function(ev) {
	    $mdDialog.show({
	      controller: 'AddController',
	      templateUrl: 'addTask.html', //embedded in task.html
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true
	    }).finally(function(){
	    	Task.updateCards($scope)
	    })
	}

	$scope.editTask = function(ev,cardData) {
	    $mdDialog.show({
	      controller: 'EditController',
	      templateUrl: 'editTask.html', //embedded in task.html
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true,
	      locals:{cardData:cardData}
	    }).finally(function(){
	    	Task.updateCards($scope)
	    })
	}

	$scope.viewTask = function(ev,cardData){
		$mdDialog.show({
	      controller: 'CardDetailController',
	      templateUrl: 'showCard.html', //embedded in task.html
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true,
	      locals:{cardData:cardData}
	    })
	}

}])

taskModule.controller('AddController',['$scope','$http','Task','$state',function($scope,$http,Task,$state){

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
  		Task.addTask($scope,{type:'add'})
	}

	$scope.getAssignEmails = function(query){
		return Task.getAssignEmails(query)
	}

}])

taskModule.controller('EditController',['$scope','$http','Task','$state','cardData',function($scope,$http,Task,$state,cardData){
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

  	cardData.expires_on = new Date(cardData.expires_on)
	$scope.newTask = cardData

  	$scope.submitTask = function(id){
  		Task.addTask($scope,{type:'edit',id:id})
	}

	$scope.getAssignEmails = function(query){
		return Task.getAssignEmails(query)
	}

}])

taskModule.controller('CardDetailController',['$scope','$http','Task','$state','cardData',function($scope,$http,Task,$state,cardData){
	console.log(cardData)
	$scope.card = cardData

}])


module.exports = taskModule;
