var taskFilters = angular.module('app.task.filters',[]);

taskFilters.filter('todo',function(){
	return function(cards){
		return cards.filter(function(x){
			return x.status == 'NEW' || x.status == 'REJECTED'
		})
	}
})

taskFilters.filter('active',function(){
	return function(cards){
		return cards.filter(function(x){
			return x.status == 'INPROGRESS'
		})
	}
})

taskFilters.filter('qa',function(){
	return function(cards){
		return cards.filter(function(x){
			return x.status == 'QA' || x.status == 'DONE'
		})
	}
})


module.exports = taskFilters;
