
module.exports = function(io){

	io.on('connection', function(socket){
	  socket.on('chat', function(msg){
	    io.emit('chat', msg);
	  });
	});

}