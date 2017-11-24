var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static('app'))

var streams = []

app.get('/getStreams', (request, response) => {
	response.send(streams)
})

app.post('/sendStream/:streamName', (request, response) => {
	let streamName = request.params.streamName

	if(streams.indexOf(streamName) < 0){
		streams.push(streamName)

		console.log('Starting streaming ' + streamName)
		
		request.on('end', () => {
			streams.splice(streams.indexOf(streamName), 1)
			console.log('Stopped streaming ' + streamName)
		})
		
		io.of('/' + streamName, (streamChannel) => {
			console.log('Someone connected to ' + streamName)

			request.on('data', (data) => {
				streamChannel.send(data)
			})

			streamChannel.on('disconnect', () => {
				console.log('Someone disconnected from ' + streamName)
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