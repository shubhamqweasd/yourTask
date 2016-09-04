var taskService = angular.module('app.task.services',[]);

taskService.factory('Task',['$http','$location','$rootScope','$state','$mdToast','$q','$mdDialog',function($http,$location,$rootScope,$state,$mdToast,$q,$mdDialog){

	var assignResource = '/task/assign/'
	var addTaskResource = '/task/add'
	var assigned = '/task/assigned'
	var created = '/task/created'

	return {
		getAssignEmails : function(query){
			var def = $q.defer()
			$http.get(assignResource+query).success(function(data){
				def.resolve(data.data)
			})
			return def.promise
		},
		addTask : function($scope){
			var err = false
			if($scope.newTask.priority == undefined || $scope.newTask.priority == ''){
				$scope.err = "Please set a priority"
				err = true
			}
			if($scope.newTask.expires_on == undefined || $scope.newTask.expires_on == ''){
				$scope.err = "Please set an expiry date for this task"
				err = true
			}
			if($scope.newTask.assigned_to == null){
				$scope.err = "Please assign this task to a valid user"
				err = true
			}
			if(!err){
				$http.post(addTaskResource,$scope.newTask).success(function(res){
					if(res.success){
						$mdDialog.hide()
					} else {
						$scope.err = res.message
					}
				})
			}	
		},
		getAssigned : function(){
			return $http.get(assigned)
		},
		getCreated : function(){
			return $http.get(created)
		}
	}
	
}])


module.exports = taskService;