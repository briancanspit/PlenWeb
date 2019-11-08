var mainCtr = $('#main-ctr'),
	hello = $('.startGreet'),
	eyeLeft = $('#eye-left'),
	eyeRight = $('#eye-right'),
	eyeToLeft = $('#eye-to-left'),
	eyeToRight = $('#eye-to-right'),
	wink = $('#wink'),
	smileUp = $('#smile-up'),
	smileDown = $('#smile-down'),
	smile = $('#smile');

var tl = new TimelineMax({
	repeat: 0,
	repeatDelay: 0.3,
	delay: 0.1,
});

TweenMax.set([mainCtr, hello], {
	opacity: 0,
});

tl.to(mainCtr, 0, {
	opacity: 1,
})
	.to(smileDown, 0.1, {
		morphSVG: '#smile-up',
	})
	.to(smile, 0.3, {
		rotation: -30,
		transformOrigin: 'center center',
		ease: Circ.ease,
	})
	.to(smile, 0.9, {
		rotation: 900,
		transformOrigin: 'center center',
		ease: Circ.easeInOut,
	})
	.to(
		eyeLeft,
		0.3,
		{
			morphSVG: '#eye-to-left',
			ease: Power2.ease,
		},
		'-=.3'
	)
	.to(
		eyeRight,
		0.3,
		{
			morphSVG: '#eye-to-right',
			ease: Power2.ease,
		},
		'-=.3'
	)
	.to(eyeRight, 0.1, {
		scaleY: 0.25,
		transformOrigin: 'center center',
	})
	.to(eyeRight, 0.1, {
		scaleY: 1,
	})
	.to(
		hello,
		0.3,
		{
			delay: 0.3,
			opacity: 1,
		},
		'-=.3'
	)
	.to(mainCtr, 0.6, {
		delay: 1,
		opacity: 0,
	});

setTimeout(function() {
	$('.preloader').css('display', 'none');
	$('body').css('background', 'transparent');
	$('#c').show(0);
	setTimeout(() => {
		$('.navbar').show(500);
	}, 200);
}, 4200);
