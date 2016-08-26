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

taskModule.controller('DialogController',['$scope','$http','Task','$state','$mdDialog',function($scope,$http,Task,$state,$mdDialog){
	
}])


module.exports = taskModule;