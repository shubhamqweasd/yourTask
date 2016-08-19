module.exports = ['$scope','$http','Auth','Dash',function($scope,$http,Auth,Dash){

	
	var user = Auth.getUsername()

	$scope.send = function(msg){
		Dash.getSocket().emit('chat',{name:user,message:msg})
		$scope.msg = ''
	}

	Dash.getSocket().on('chat', function(data){
		messageElement = document.getElementById('messages')
		angular.element(messageElement).append('<li><strong>'+data.name+' : </strong><B>'+data.message+'</B></li>')
	});

}]