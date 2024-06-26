;(function () {
	
	'use strict';

	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};


	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Main Menu Superfish
	var mainMenu = function() {

		$('#fh5co-primary-menu').superfish({
			delay: 0,
			animation: {
				opacity: 'show'
			},
			speed: 'fast',
			cssArrows: true,
			disableHI: true
		});


		$('#fh5co-primary-menu li a').each(function() {
			$(this).parent().removeClass('active');
			if ($(this).attr('href') == location.href.split("/").slice(-1)){ 
				$(this).parent().addClass('active'); }
		});

	};

	// Parallax
	
	var parallax = function() {
		var w = $(window).width();
		var positionh = 0;
		if ( !isiPad() || !isiPhone() ) {
			if (w < 954) {
				//positionh = -(1920 - 954)/2;
				positionh = (w/2) - 897;
			}
			//document.getElementById("fh5co-bg").style.backgroundPosition = positionh; 
			$(window).stellar({horizontalOffset: positionh});
			console.log("w: " + w + " positionh: " + positionh);
		}
	};


	// Offcanvas and cloning of the main menu
	var offcanvas = function() {

		var $clone = $('#fh5co-menu-wrap').clone();
		$clone.attr({
			'id' : 'offcanvas-menu'
		});
		$clone.find('> ul').attr({
			'class' : '',
			'id' : ''
		});

		$('#fh5co-page').prepend($clone);

		// click the burger
		$('.js-fh5co-nav-toggle').on('click', function(){

			if ( $('body').hasClass('fh5co-offcanvas') ) {
				$('body').removeClass('fh5co-offcanvas');
			} else {
				$('body').addClass('fh5co-offcanvas');
			}
			// event.preventDefault();

		});

		$('#offcanvas-menu').css('height', $(window).height());

		$(window).resize(function(){
			var w = $(window);
			$('#offcanvas-menu').css('height', w.height());

			if ( w.width() > 769 ) {
				if ( $('body').hasClass('fh5co-offcanvas') ) {
					$('body').removeClass('fh5co-offcanvas');
				}
			}

			parallax();

		});	

	}

	

	// Click outside of the Mobile Menu
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
	    var container = $("#offcanvas-menu, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('fh5co-offcanvas') ) {
				$('body').removeClass('fh5co-offcanvas');
			}
	    }
		});
	};


	// Animations

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};
	
	var stickyBanner = function() {
		var $stickyElement = $('.sticky-banner');
		var sticky;
		if ($stickyElement.length) {
		  sticky = new Waypoint.Sticky({
		      element: $stickyElement[0],
		      offset: 0
		  })
		}
	};

	//FA
	
	function getHTMLContent(fileName) {

		var url = fileName; //"header.html"; //"NewFile1.html";
		var request;

		var readyFunction = () => {
			if (request.readyState == 4) {
				var val = request.responseText;
				//console.log("content: " + val);
				var startContent = document.getElementById('fh5co-page').innerHTML;
				document.getElementById('fh5co-page').innerHTML = val + startContent;
				
			}
		}
	
		if(fileName === "footer.html"){
			readyFunction = () => {
				if (request.readyState == 4) {
					var val = request.responseText;
					//console.log("contentFooter: " + val);
					//var startContent = document.getElementById('footer').innerHTML;
					//document.getElementById('footer').innerHTML = val + startContent;
					document.getElementById('footer').innerHTML = val;
				}
			}
		}
		

		if (window.XMLHttpRequest) {
			request = new XMLHttpRequest();
		}
		else if (window.ActiveXObject) {
			request = new ActiveXObject("Microsoft.XMLHTTP");
		}

		try {
			request.onreadystatechange = readyFunction;//getInfo;
			request.open("GET", url, true);
			request.send();
		}
		catch (e) {
			alert("Unable to connect to server");
		}
	}

	
	//FA

	// Set the date we're counting down to
	var countDownDate = new Date("Oct 12, 2024 15:37:25").getTime();
	console.log("date:" + countDownDate);

	// Update the count down every 1 second
	var x = setInterval(function() {

	// Get todays date and time
	var now = new Date().getTime();

	// Find the distance between now an the count down date
	var distance = countDownDate - now;

	// Time calculations for days, hours, minutes and seconds
	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	// Display the result in an element with id="demo"
	// document.getElementById("demo").innerHTML = days + "Days " + hours + "Hours "
	// + minutes + "Minutes " + seconds + "Seconds ";

	// Display the result in an element with id="demo"
	document.getElementById("days").innerHTML = days +" <small>días</small>";
	document.getElementById("hours").innerHTML = hours + " <small>horas</small> ";
	document.getElementById("minutes").innerHTML = minutes + " <small>minutos</small> ";
	document.getElementById("seconds").innerHTML = seconds + " <small>segundos</small> ";

	// If the count down is finished, write some text 
	if (distance < 0) {
	 clearInterval(x);
	 document.getElementById("demo").innerHTML = "The Wedding Ceremony is Over";
	}
	}, 1000);

	// Document on load.
	getHTMLContent("header.html");
	getHTMLContent("footer.html");

	/*mainMenu();
		//parallax();
		offcanvas();
		mobileMenuOutsideClick();
		contentWayPoint();
		stickyBanner();*/

	$(function(){
		
		mainMenu();
		
		offcanvas();
		mobileMenuOutsideClick();
		contentWayPoint();
		stickyBanner();
		parallax();
		
	});


}());