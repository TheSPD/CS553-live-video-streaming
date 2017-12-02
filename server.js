var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static('app'))

var streams = {}

app.get('/getStreams', (request, response) => {
	response.send(streams)
})

app.post('/sendStream/:streamName', (request, response) => {
	let streamName = request.params.streamName

	if(!(streams[streamName])){
		streams[streamName] = 0

		console.log('Starting streaming ' + streamName)
		

		io.of('/' + streamName, (streamChannel) => {
			console.log(streamChannel.request.connection.remoteAddress 
				+ ' connected to ' 
				+ streamName)
			streams[streamName]++

			request.on('data', (data) => {
				streamChannel.send(data)
			})

			streamChannel.on('disconnect', () => {
				streams[streamName]--
				console.log(streamChannel.request.connection.remoteAddress 
					+ ' disconnected from ' 
					+ streamName)
			})

			request.on('end', () => {
				request.destroy()
				delete streams[streamName]

				const MyNamespace = streamChannel; // Get Namespace
				const connectedNameSpaceSockets = Object.keys(MyNamespace.connected); // Get Object with Connected SocketIds as properties
				connectedNameSpaceSockets.forEach(socketId => {
				    MyNamespace.connected[socketId].disconnect(); // Disconnect Each socket
				});
				MyNamespace.removeAllListeners(); // Remove all Listeners for the event emitter
				
				delete io.nsps['/' + streamName]; // Remove from the server namespaces
				
				console.log('Stopped streaming ' + streamName)
			})

		})		
	}
	else{
		console.log('Stream with ' + streamName + ' exists!!!')
		response.status(501)
			.send('Stream with ' + streamName + ' exists!!!')
	}
})

http.listen(3000, function(){
	console.log('listening on *:3000')
})