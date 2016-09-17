var chatDirectives = angular.module('app.chat.directives',[]);

chatDirectives.directive('messages',['Chat',function(Chat){
	return {
		restrict : 'E',
		transclude: true,
		replace:true,
		link:function($scope,elem,attr,ctrl,transclude){
			elem.append(transclude())
			var messageElement = document.getElementById('messages')
			$scope.$on('newMessage',function(evt,data){
				elem.append('<div class="bubble '+data.who+'"><h4>'+data.data.message+'</h4><h5> : '+data.data.name+'</h5></div>')
		   		messageElement.scrollTop = messageElement.scrollHeight - messageElement.clientHeight;
			})
			Chat.getMessages().forEach(function(data){
				elem.append('<div class="bubble '+data.who+'"><h4>'+data.data.message+'</h4><h5> : '+data.data.name+'</h5></div>')
		   		messageElement.scrollTop = messageElement.scrollHeight - messageElement.clientHeight;
			})
		}
	}
}])

module.exports = chatDirectives;