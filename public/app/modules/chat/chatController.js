module.exports = ['$scope','$http',function($scope,$http){

	var socket = io();
	
	$scope.send = function(msg){
		socket.emit('chat',msg)
		$scope.msg = ''
	}

	socket.on('chat', function(msg){
		messageElement = document.getElementById('messages')
		angular.element(messageElement).append('<li><B>'+msg+'</B></li>')
	});

}]