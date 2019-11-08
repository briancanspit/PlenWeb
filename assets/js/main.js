var c = document.getElementById('c');
var ctx = c.getContext('2d');
var cH;
var cW;
var bgColor = '#a34a28';
var animations = [];
var circles = [];
var metaThemeColor = document.querySelector('meta[name=theme-color]');
var overflowFlag = true;

function revampPage(current) {
	if (current == '#a34a28') {
		$('.head-text').css('color', '#5edfff');
		$('.btn').css('background', '#5edfff');
		$('.btn').each(function() {
			this.style.setProperty('color', '#000', 'important');
		});
		$('.nav-link').each(function() {
			this.style.setProperty('color', '#5edfff', 'important');
		});
	} else if (current == '#282741') {
		$('.head-text').css('color', '#e6a400');
		$('.btn').css('background', '#e6a400');
		$('.btn').each(function() {
			this.style.setProperty('color', '#000', 'important');
		});
		$('.nav-link').each(function() {
			this.style.setProperty('color', '#e6a400', 'important');
		});
	} else if (current == '#211717') {
		$('.head-text').css('color', '#fda77f');
		$('.btn').css('background', '#fda77f');
		$('.btn').each(function() {
			this.style.setProperty('color', '#000', 'important');
		});
		$('.nav-link').each(function() {
			this.style.setProperty('color', '#fda77f', 'important');
		});
	} else if (current == '#02383c') {
		$('.head-text').css('color', '#c2e8ce');
		$('.btn').css('background', '#c2e8ce');
		$('.btn').each(function() {
			this.style.setProperty('color', '#000', 'important');
		});
		$('.nav-link').each(function() {
			this.style.setProperty('color', '#c2e8ce', 'important');
		});
	} else if (current == '#7c0a02') {
		$('.head-text').css('color', '#ddf796');
		$('.btn').css('background', '#ddf796');
		$('.btn').each(function() {
			this.style.setProperty('color', '#000', 'important');
		});
		$('.nav-link').each(function() {
			this.style.setProperty('color', '#ddf796', 'important');
		});
	} else if (current == '#445c3c') {
		$('.head-text').css('color', '#f7be16');
		$('.btn').css('background', '#f7be16');
		$('.btn').each(function() {
			this.style.setProperty('color', '#000', 'important');
		});
		$('.nav-link').each(function() {
			this.style.setProperty('color', '#f7be16', 'important');
		});
	} else {
		return;
	}
}

var colorPicker = (function() {
	var colors = ['#a34a28', '#282741', '#211717', '#02383c', '#445c3c', '#7c0a02'];
	var index = 0;
	function next() {
		index = index++ < colors.length - 1 ? index : 0;
		return colors[index];
	}
	function current() {
		return colors[index];
	}
	return {
		next: next,
		current: current,
	};
})();

function removeAnimation(animation) {
	var index = animations.indexOf(animation);
	if (index > -1) animations.splice(index, 1);
}

function calcPageFillRadius(x, y) {
	var l = Math.max(x - 0, cW - x);
	var h = Math.max(y - 0, cH - y);
	return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
}

function addClickListeners() {
	document.addEventListener('touchstart', handleEvent);
	document.addEventListener('mousedown', handleEvent);
}

const revampDoc = clr => {
	$('.head-text').css('color', clr);
};

function handleEvent(e) {
	if (e.touches) {
		e.preventDefault();
		e = e.touches[0];
	}
	var currentColor = colorPicker.current();
	var nextColor = colorPicker.next();

	revampPage(currentColor, nextColor);

	var targetR = calcPageFillRadius(e.pageX, e.pageY);
	var rippleSize = Math.min(200, cW * 0.4);
	var minCoverDuration = 750;

	var pageFill = new Circle({
		x: e.pageX,
		y: e.pageY,
		r: 0,
		fill: nextColor,
	});
	var fillAnimation = anime({
		targets: pageFill,
		r: targetR,
		duration: Math.max(targetR / 2, minCoverDuration),
		easing: 'easeOutQuart',
		complete: function() {
			bgColor = pageFill.fill;
			removeAnimation(fillAnimation);
		},
	});

	var ripple = new Circle({
		x: e.pageX,
		y: e.pageY,
		r: 0,
		fill: currentColor,
		stroke: {
			width: 3,
			color: currentColor,
		},
		opacity: 1,
	});
	var rippleAnimation = anime({
		targets: ripple,
		r: rippleSize,
		opacity: 0,
		easing: 'easeOutExpo',
		duration: 900,
		complete: removeAnimation,
	});

	var particles = [];
	for (var i = 0; i < 32; i++) {
		var particle = new Circle({
			x: e.pageX,
			y: e.pageY,
			fill: currentColor,
			r: anime.random(24, 48),
		});
		particles.push(particle);
	}
	var particlesAnimation = anime({
		targets: particles,
		x: function(particle) {
			return particle.x + anime.random(rippleSize, -rippleSize);
		},
		y: function(particle) {
			return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
		},
		r: 0,
		easing: 'easeOutExpo',
		duration: anime.random(1000, 1300),
		complete: removeAnimation,
	});
	animations.push(fillAnimation, rippleAnimation, particlesAnimation);
}

function extend(a, b) {
	for (var key in b) {
		if (b.hasOwnProperty(key)) {
			a[key] = b[key];
		}
	}
	return a;
}

var Circle = function(opts) {
	extend(this, opts);
};

Circle.prototype.draw = function() {
	ctx.globalAlpha = this.opacity || 1;
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
	if (this.stroke) {
		ctx.strokeStyle = this.stroke.color;
		ctx.lineWidth = this.stroke.width;
		ctx.stroke();
	}
	if (this.fill) {
		ctx.fillStyle = this.fill;
		ctx.fill();
	}
	ctx.closePath();
	ctx.globalAlpha = 1;
};

var animate = anime({
	duration: Infinity,
	update: function() {
		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, cW, cH);
		animations.forEach(function(anim) {
			anim.animatables.forEach(function(animatable) {
				animatable.target.draw();
			});
		});
	},
});

var resizeCanvas = function() {
	cW = window.innerWidth;
	cH = window.innerHeight;
	c.width = cW * devicePixelRatio;
	c.height = cH * devicePixelRatio;
	ctx.scale(devicePixelRatio, devicePixelRatio);
};

(function init() {
	resizeCanvas();
	if (window.CP) {
		// CodePen's loop detection was causin' problems
		// and I have no idea why, so...
		window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000;
	}
	window.addEventListener('resize', resizeCanvas);
	addClickListeners();
	if (!!window.location.pathname.match(/fullcpgrid/)) {
		startFauxClicking();
	}
	handleInactiveUser();
})();

function handleInactiveUser() {
	var inactive = setTimeout(function() {
		//fauxClick(cW / 2, cH / 2);
	}, 2000);

	function clearInactiveTimeout() {
		clearTimeout(inactive);
		document.removeEventListener('mousedown', clearInactiveTimeout);
		document.removeEventListener('touchstart', clearInactiveTimeout);
	}

	document.addEventListener('mousedown', clearInactiveTimeout);
	document.addEventListener('touchstart', clearInactiveTimeout);
}

/*
function startFauxClicking() {
	setTimeout(function() {
		fauxClick(anime.random(cW * 0.2, cW * 0.8), anime.random(cH * 0.2, cH * 0.8));
		startFauxClicking();
	}, anime.random(200, 900));
}
*/

function fauxClick(x, y) {
	var fauxClick = new Event('mousedown');
	fauxClick.pageX = x;
	fauxClick.pageY = y;
	document.dispatchEvent(fauxClick);
}

$('#toggle').click(function() {
	$(this).toggleClass('on');
});
