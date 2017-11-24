var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('app'))

var streams = [];

app.post('/sendStream/:streamName', (request, response) => {
	let streamName = request.params.streamName

	if(streams.indexOf(streamName) < 0){
		streams.push(streamName)

		console.log('Starting streaming ' + streamName)
		console.log(streams)
		io.of('/' + streamName, (streamChannel) => {
			
			request.on('data', (data) => {
				streamChannel.send(data)
			});

			request.on('end', () => {
				streams.splice(streams.indexOf(streamName), 1)
				console.log('Stopped streaming ' + streamName)
			})
		})		
	}
	else{
		console.log('Stream with ' + streamName + ' exists!!!')
		response.status(501)
			.send("Stream already exists!!!")
	}
})

http.listen(3000, function(){
	console.log('listening on *:3000')
});