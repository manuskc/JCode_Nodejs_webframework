var http = require("http");
var socketio = require('socket.io'); //npm install socket

function start(route, handle, port) {

	function onRequest(request, response) {
		route(handle, request, response, io);
	}
	
	var server = http.createServer(onRequest);
	io = socketio.listen(server);
	server.listen(port);
	console.log("Server has started.");
	io.sockets.on('connection', function (socket) {
			//do something!
	});
}

exports.start = start;
