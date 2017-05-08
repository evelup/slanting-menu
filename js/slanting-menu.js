$(document).ready(function() {

	function cos() {
		$('.main-content').toggleClass('move');
		var header = $('header');
		if(header.hasClass('show')) {
			header.removeClass('text')
			setTimeout(function(){
				header.removeClass('show')
				header.addClass('hide')
			}, 300)
		} else {
			header.addClass('show')
			header.removeClass('hide')
			header.addClass('text')
		}
	}
	
	$('.toggle-container').click(cos);
	$('.nav-item a').click(function(event) {
		// setTimeout(cos, 0);
		cos();
		event.preventDefault();
		var secNo = this.hash;
		var animTime = Math.abs(($(secNo).offset().top)-($('body').scrollTop()));
		console.log(animTime);
		$('body').delay(500).animate({
			scrollTop: $(secNo).offset().top
		}, animTime*0.4, 'easeInOutQuint')
	})
})