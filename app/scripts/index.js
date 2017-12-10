$(document).ready(function(){
	$('.thumb').slick({
		dots: true,
	  	infinite: true,
	  	// centerMode: true,
		// centerPadding: '60px',
	  	slidesToShow: 1,
	 	slidesToScroll: 1
	});

	
	var canvas = $('#video-canvas')[0]
	var channelName = canvas.getAttribute('data-default')
	var socketAddress = '/' + channelName
	var player = new JSMpeg.Player('pipe', {canvas: canvas, autoplay: true})
	var socket = io(socketAddress)

	$('#channel-name').text(channelName)

	socket.on('message', (data) => {
		player.write(data)
	})

	
	// var channels = $('.thumb').children().children().children().map(function(){ 
	// 	return $(this).attr('data-channel') 
	// })

	// var canvases = []
	// var players = []
	// var sockets = []


	// for(index = 0; index < channels.length; ++index){
	// 	debugger;
	// 	canvases.push($('#video-canvas-' + channels[index])[0])
	// 	let channelName = channels[index]
	// 	let socketAddress = '/' + channelName
	// 	players.push(new JSMpeg.Player('pipe', 
	// 		{canvas: canvases[index], autoplay: true}, 
	// 		() => sockets.push(io(socketAddress, (newSocket) => {
	// 		newSocket.on('message', (data) => {
	// 			console.log('lala')
	// 			players[index].write(data)
	// 		})	
	// 	}))))
		
	// }


	$('.thumb').on('afterChange', function(event, slick, currentSlide, nextSlide){
		channelName = $(slick.$slides.get(currentSlide)).data('channel')
		socketAddress = '/' + channelName

		socket.disconnect()
		console.log(socketAddress)
		socket = io(socketAddress, {'forceNew': true})

		socket.on('message', (data) => {
			player.write(data)
		})

		socket.on('disconnect', () => {
			console.log("End of connection")
		})

		$('#channel-name').text(channelName)
	})

	// $('.thumb').on('click', function(event, slick, currentSlide, nextSlide){
	// 	channelName = $(slick.$slides.get(currentSlide)).data('channel')
	// 	socketAddress = '/' + channelName

	// 	socket.disconnect()
	// 	console.log(socketAddress)
	// 	socket = io(socketAddress, {'forceNew': true})

	// 	socket.on('message', (data) => {
	// 		player.write(data)
	// 	})

	// 	socket.on('disconnect', () => {
	// 		console.log("End of connection")
	// 	})

	// 	$('#channel-name').text(channelName)
	// })

})

