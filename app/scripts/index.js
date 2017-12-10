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


	$('.thumb').on('afterChange', function(event, slick, currentSlide, nextSlide){
		socket.disconnect()
		channelName = $(slick.$slides.get(currentSlide)).data('channel')
		socketAddress = '/' + channelName
		window.open('/view' +  socketAddress,"_self")
	})

})

