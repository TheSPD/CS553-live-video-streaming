var express = require('express'),
	ffmpeg = require('fluent-ffmpeg'),
	fs = require('fs'),
	io = require('socket.io')(http)

var app = express();

app.use(express.static(__dirname + '/app'))

// app.get('/', function(req, res) {
// 	res.sendFile('index.html')
// });

// app.head('/video/:filename', function (req, res) {
// 	console.log('Head')
// 	res.set('Transfer-Encoding', 'chunked').send();
// })

// app.get('/video/:filename', function(req, res) {
// 	// res.contentType('mpegts')
// 	var pathToMovie = __dirname + '/samples/' + req.params.filename
// 	console.log(pathToMovie)
// 	var proc = ffmpeg(pathToMovie)
// 		.format('mpegts')
// 		// .size('320x?')
// 		.videoBitrate('512k')
// 		.videoCodec('mpeg1video')
// 		.fps(24)
// 		// .audioBitrate('96k')
// 		// .audioCodec('aac')
// 		// .audioFrequency(22050)
// 		// .audioChannels(2);
// 		.native()
// 		// .format('mpegts')
// 		.size('640x480')
// 		// setup event handlers
// 		.on('end', function() {
// 		  console.log('file has been converted succesfully');
// 		})
// 		.on('error', function(err) {
// 		  console.log('an error happened: ' + err.message);
// 		})
// 		// save to stream
// 		.pipe(res, {end:true});
// });

app.listen(4000);