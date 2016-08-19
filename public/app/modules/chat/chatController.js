module.exports = ['$scope','$http','Auth','Dash',function($scope,$http,Auth,Dash){

	
	var user = Auth.getUsername()

	$scope.send = function(msg){
		Dash.getSocket().emit('chat',{name:user,message:msg})
		$scope.msg = ''
	}

	Dash.getSocket().on('chat', function(data){
		messageElement = document.getElementById('messages')
		angular.element(messageElement).append('<li><strong>'+data.name+' : </strong><B>'+data.message+'</B></li>')
		// angular.element(messageElement).append('<li class="media"><div class="media-body"><div class="media"><a class="pull-left" href="#"><!-- <img class="media-object img-circle " src="assets/img/user.png" /> --></a><div class="media-body" >'+data.message+'<br /><small class="text-muted">'+data.name+'</small><hr /></div></div></div></li>')
	});

}]