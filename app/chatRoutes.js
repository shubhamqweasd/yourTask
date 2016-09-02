
module.exports = function(io){
	var allClients = []

	io.on('connection', function(socket){

		socket.on('newClient', function(data){
			if(alreadyLogged(data)){
				allClients.push({socket:socket,client:data})
			}
			//return current client on connection
			io.emit('clients',returnClients())
		});

		//chat event brodcast to every socket client
		socket.on('chat', function(msg){
			io.emit('chat', msg);
		});

		//disconnect event , emit currently connected clients
		socket.on('disconnect',function(){
			allClients = updateClients(socket)
			io.emit('clients',returnClients())
		})
	});

	function returnClients(){
		return allClients.map(function(x){
			return x.client
		})
	}

	function updateClients(socket){
		return allClients.filter(function(x){
			return x.socket.id != socket.id
		})
	}

	function alreadyLogged(newClient){
		for(var k in allClients){
			if(allClients[k].client.email == newClient.email){
				return false
			}
		}
		return true
	}

}