/*-------------------------------------------------------------------------------------------------------------------------------*/
/*This is main JS file that contains custom scripts used in this template*/
/*-------------------------------------------------------------------------------------------------------------------------------*/
/* Template Name: Site Title*/
/* Version: 1.0 Initial Release*/
/* Build Date: 22-04-2015*/
/* Author: Unbranded*/
/* Website: http://
/* Copyright: (C) 2015 */
/*-------------------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------*/
/* TABLE OF CONTENTS: */
/*--------------------------------------------------------*/
/* 01 - VARIABLES */
/* 02 - page calculations */
/* 03 - function on document ready */
/* 04 - function on page load */
/* 05 - function on page resize */
/* 06 - function on page scroll */
/* 07 - swiper sliders */
/* 08 - buttons, clicks, hovers */
/*-------------------------------------------------------------------------------------------------------------------------------*/

$(function() {

	"use strict";

	/*================*/
	/* 01 - VARIABLES */
	/*================*/
	var swipers = [], winW, winH, winScr, _isresponsive, intPoint = 500, smPoint = 768, mdPoint = 992, lgPoint = 1200, addPoint = 1600, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

	/*========================*/
	/* 02 - page calculations */
	/*========================*/
	function pageCalculations(){
		winW = $(window).width();
		winH = $(window).height();
		if($('.menu-button').is(':visible')) _isresponsive = true;
		else _isresponsive = false;

		$('.fixed-header-margin').css({'padding-top':$('header').outerHeight(true)});
		$('.parallax-slide').css({'height':winH});
	}

	/*=================================*/
	/* 03 - function on document ready */
	/*=================================*/
	pageCalculations();
	if($('.search-drop-down .overflow').length && !_ismobile) {
		$('.search-drop-down').addClass('active');
		$('.search-drop-down .overflow').jScrollPane();
		$('.search-drop-down').removeClass('active');
	}
	if(_ismobile) $('body').addClass('mobile');

	/*============================*/
	/* 04 - function on page load */
	/*============================*/
	$(window).load(function(){
		pageCalculations();
		$('#loader-wrapper').fadeOut();
		$('body').addClass('loaded');
	});

	/*==============================*/
	/* 05 - function on page resize */
	/*==============================*/
	function resizeCall(){
		pageCalculations();

		$('.navigation:not(.disable-animation)').addClass('disable-animation');

	}
	if(!_ismobile){
		$(window).resize(function(){
			resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			resizeCall();
		}, false);
	}

	/*==============================*/
	/* 06 - function on page scroll */
	/*==============================*/
	function scrollCalculations(){
		winScr = $(window).scrollTop();
		var headerComp = ($('header').outerHeight()<=200)?$('header').outerHeight():200;
		if(winScr>=headerComp && !$('.header-demo').length) {
			if(!$('header').hasClass('fixed-header')){
				$('header').addClass('fixed-header');
				if(!_ismobile) closePopups();
			}
		}
		else {
			if($('header').hasClass('fixed-header')){
				$('header').removeClass('fixed-header');
				if(!_ismobile) closePopups();
			}
		}
		$('nav').addClass('disable-animation');
	}

	scrollCalculations();
	$(window).scroll(function(){
		scrollCalculations();
	});

	
	/*==============================*/
	/* 08 - buttons, clicks, hovers */
	/*==============================*/

	//desktop menu
	$('nav>ul>li').on('mouseover', function(){
		if(!_isresponsive){
			$(this).find('.submenu').stop().fadeIn(300);
		}
	});

	$('nav>ul>li').on('mouseleave', function(){
		if(!_isresponsive){
			$(this).find('.submenu').stop().fadeOut(300);
		}
	});

	//responsive menu
	$('nav li .menuAccordionTitle').on('click', function(){
		if(_isresponsive){
			$(this).siblings('.submenu').slideToggle();
			$(this).parent().toggleClass('opened');
		}
	});

	$('.submenu-list-title').on('click', function(){
		if(_isresponsive){
			$(this).next('.toggle-list-container').slideToggle();
			$(this).toggleClass('opened');
		}
	});

	$('.menu-button').on('click', function(){
		$('.navigation.disable-animation').removeClass('disable-animation');
		$('body').addClass('opened-menu');
		$(this).closest('header').addClass('opened');
		$('.opened .close-header-layer').fadeIn(300);
		closePopups();
		return false;
	});

	$('.close-header-layer, .close-menu').on('click', function(){
		$('.navigation.disable-animation').removeClass('disable-animation');
		$('body').removeClass('opened-menu');
		$('header.opened').removeClass('opened');
		$('.close-header-layer:visible').fadeOut(300);
	});

	//toggle menu block for "everything" template
	$('.toggle-desktop-menu').on('click', function(){
		$('.navigation').toggleClass('active');
		$('nav').removeClass('disable-animation');
		$('.search-drop-down').removeClass('active');
	});

	/*sidebar menu*/
	$('.sidebar-navigation .title').on('click', function(){
		if($('.sidebar-navigation .title .fa').is(':visible')) {
			$(this).parent().find('.list').slideToggle(300);
			$(this).parent().toggleClass('active');
		}
	});

	/*search drop down*/
	$('.search-drop-down .title').on('click', function(){
		$(this).parent().toggleClass('active');
	});

	$('.search-drop-down .category-entry').on('click', function(){
		var thisDropDown = $(this).closest('.search-drop-down');
		thisDropDown.removeClass('active');
		thisDropDown.find('.title span').text($(this).text());
	});

	/*search popup*/
	$('.open-search-popup').on('click', function(e){
		if(!$('.search-box.popup').hasClass('active')){
			clearTimeout(closecartTimeout);
			$('.cart-box.active').animate({'opacity':'0'}, 300, function(){$(this).removeClass('active');});
			$('.search-box.popup').addClass('active').css({'right':winW - $(this).offset().left-$(this).outerWidth()*0.5-45, 'top':$(this).offset().top-winScr+0.1*$(this).height()+35, 'opacity':'0'}).stop().animate({'opacity':'1'}, 300, function(){
				$('.search-box.popup input').focus();
			});
		}
		else closePopups();
		if(e.pageY-winScr>winH-100) $('.search-box.popup').addClass('bottom-align');
		else $('.search-box.popup').removeClass('bottom-align');
		return false;
	});

	/*cart popup*/
	$('.open-cart-popup').on('mouseover', function(e){
		clearTimeout(closecartTimeout);
		
		if(!$('.cart-box.popup').hasClass('active')){
			closePopups();
			if($(this).offset().left>winW*0.5){
				$('.cart-box.popup').addClass('active cart-right').css({'left':'auto', 'right':winW - $(this).offset().left-$(this).outerWidth()*0.5-47, 'top':$(this).offset().top-winScr+15, 'opacity':'0'}).stop().animate({'opacity':'1'}, 300);			
			}
			else{
				$('.cart-box.popup').addClass('active cart-left').css({'right':'auto', 'left':$(this).offset().left, 'top':$(this).offset().top-winScr+15, 'opacity':'0'}).stop().animate({'opacity':'1'}, 300);			
			}
		}
		//if($(this).offset().left<100) $('.cart-box.popup').addClass('left-align');
		//else if($(this).hasClass('header-functionality-entry') && $(this).closest('header.type-3').length) $('.cart-box.popup').addClass('fixed-header-left');
		//else $('.cart-box.popup').removeClass('left-align');
	});
	
	$('.open-cart-popup').on('mouseleave', function(){
		closecartTimeout = setTimeout(function(){closePopups();}, 1000);
	});

	var closecartTimeout = 0;
	$('.cart-box.popup').on('mouseover', function(){
		clearTimeout(closecartTimeout);
	});
	$('.cart-box.popup').on('mouseleave', function(){
		closecartTimeout = setTimeout(function(){closePopups();}, 1000);
	});

	function closePopups(){
		$('.popup.active').animate({'opacity':'0'}, 300, function(){$(this).removeClass('active'); $('.cart-box').removeClass('cart-left cart-right');});
	}

	/*departments dropdown (template "fullwidthheader")*/
	$('.departmets-drop-down .title').on('click', function(){
		$(this).parent().find('.list').slideToggle(300);
		$(this).toggleClass('active');
	});

	$('.departmets-drop-down').on('mouseleave', function(){
		$(this).find('.list').slideUp(300);
		$(this).find('.title').removeClass('active');
	});

	/*simple arrows slider*/
	var finishBannerSlider = 0;
    function leftClick(obj_clone, arrow){
        var obj = arrow.parent().parent().find(obj_clone);
        if (finishBannerSlider) return false;
        finishBannerSlider = 1;
        obj.last().clone(true).insertBefore(obj.first());
        obj.last().remove();
        var item_width = obj.outerWidth(true);
        obj.parent().css('left','-'+item_width+'px');
        obj.parent().animate({'left':'0px'},300, function(){finishBannerSlider=0;});
        return false;
    }
    
    function rightClick(obj_clone, arrow){
        var obj = arrow.parent().parent().find(obj_clone);
        if (finishBannerSlider) return false;
        finishBannerSlider = 1;
        obj.first().clone(true).insertAfter(obj.last());
        var item_width = obj.outerWidth(true);
        obj.parent().animate({'left':'-'+item_width+'px'},300, function(){
            obj.first().remove();
            obj.parent().css('left','0px');
            finishBannerSlider=0;
        });
        return false;
    }

    $('.menu-slider-arrows .left').on('click', function(){
    	leftClick('.menu-slider-entry', $(this));
    });

    $('.menu-slider-arrows .right').on('click', function(){
    	rightClick('.menu-slider-entry', $(this));
    });


    //product page - selecting size, quantity, color
    $('.size-selector .entry').on('click', function(){
    	$(this).parent().find('.active').removeClass('active');
    	$(this).addClass('active');
    });

    $('.color-selector .entry').on('click', function(){
    	$(this).parent().find('.active').removeClass('active');
    	$(this).addClass('active');
    });

    $('.number-plus').on('click', function(){
    	var divUpd = $(this).parent().find('.number'), newVal = parseInt(divUpd.text(), 10)+1;
    	divUpd.text(newVal);
    });

    $('.number-minus').on('click', function(){
    	var divUpd = $(this).parent().find('.number'), newVal = parseInt(divUpd.text(), 10)-1;
    	if(newVal>=1) divUpd.text(newVal);
    });

    //accordeon
    $('.accordeon-title').on('click', function(){
    	$(this).toggleClass('active');
    	$(this).next().slideToggle();
    });

    //open image popup
    $('.open-image').on('click', function(){
    	showPopup($('#image-popup'));
    	return false;
    });

    //open subscribe popup
    $('.open-subscribe').on('click', function(){
    	showPopup($('#subscribe-popup'));
    	$('#subscribe-popup .styled-form .field-wrapper input').focus();
    	return false;
    });

    $('.close-popup, .overlay-popup .close-layer').on('click', function(){
    	$('.overlay-popup.visible').removeClass('active');
    	setTimeout(function(){$('.overlay-popup.visible').removeClass('visible');}, 500);
    });

    function showPopup(id){
    	id.addClass('visible active');
    }

    //shop - sort arrow
    $('.sort-button').click(function(){
    	$(this).toggleClass('active');
    });

    //shop - view button
    $('.view-button.grid').click(function(){
    	if($(this).hasClass('active')) return false;
    	$('.shop-grid').fadeOut(function(){
    		$('.shop-grid').removeClass('list-view').addClass('grid-view');
    		$(this).fadeIn();
    	});
    	$(this).parent().find('.active').removeClass('active');
    	$(this).addClass('active');
    });

    $('.view-button.list').click(function(){
    	if($(this).hasClass('active')) return false;
    	$('.shop-grid').fadeOut(function(){
    		$('.shop-grid').removeClass('grid-view').addClass('list-view');
    		$(this).fadeIn();
    	});
    	$(this).parent().find('.active').removeClass('active');
    	$(this).addClass('active');
    });

    //close message
    $('.message-close').on('click', function(){
    	$(this).parent().hide();
    });

    //portfolio
    $('.portfolio-entry').on('mouseover', function(){
    	$(this).addClass('active');
    });

    $('.portfolio-entry').on('mouseleave', function(){
    	$(this).removeClass('active');
    });

    //simple search form focus
    $('.simple-search-form input').on('focus', function(){
    	$(this).closest('.simple-search-form').addClass('active');
    });

    $('.simple-search-form input').on('blur', function(){
    	$(this).closest('.simple-search-form').removeClass('active');
    });


    // Custom JS

	 // Wishlist icon change on hover
    $('.wishlist-icon').hover(function() {
      $(this).find('i').toggleClass('fa fa-heart-o fa fa-heart');
    });
    $('.wishlist-icon').click(function() {
      $(this).find('i').toggleClass('fa fa-heart-o fa fa-heart');
    });

    // Cart Pop-up
    $('.cart-open-icon').click(function(){
        $('body').toggleClass('is-visible');
    });

    $('.PageOverlay,.cartCloseBtn').on('click', function(){
        $('body').removeClass('is-visible');
    });

    //  Social media share button
    $('.shareIco').click(function(){
        $('.share-box .socials-box').toggleClass('active');
    });

    // Search hide on window click
    $(document).click(function(){
        $('.search-box.popup').removeClass('active');
    });

    $('.search-box.popup').click(function( event ) {
      event.stopPropagation();
    });

     function appHeight() {
        var doc = document.documentElement;
        doc.style.setProperty('--vh', (window.innerHeight/100) + 'px');
      }
      window.addEventListener('resize', appHeight);
      appHeight();

     //  Checkout cart
    $('.checkout-cart-btn').click(function(){
        $('.checkout-right-wrapper').toggleClass('active');
    });
    $('.checkoutMobileBtn').click(function(){
        $('.checkout-right-wrapper').removeClass('active');
    });

    // Mobile filter
    $(document).on('click', '.stuckSortingBtn', function(){
        $('.PageOverlay').toggleClass('is-visible');
        $('.MobileFilterSortingSidebar').toggleClass('activeMobileFilterSortingSidebar');
    });
    $(document).on('click', '.mobileSortingItem', function(){
        $('.PageOverlay').removeClass('is-visible ');
        $(".MobileFilterSortingSidebar").removeClass('activeMobileFilterSortingSidebar');
        $('.cartOverlay').fadeOut();
        $('.mobileSortingItem').removeClass('mobileSortingItemActive');
        $(this).toggleClass('mobileSortingItemActive');
    });
    $(document).on('click', '.stuckFilterBtn', function(){
        $('.categories-border-wrapper').toggleClass('active');
    });
    $(document).on('click', '.categories-border-wrapper .closeIcoBtn', function(){
        $('.categories-border-wrapper').removeClass('active');
    });
    $(document).on('click', '.PageOverlay', function(){
        $(".MobileFilterSortingSidebar").removeClass('activeMobileFilterSortingSidebar');
        $(this).removeClass('is-visible');
    });

    // Remove disabled from input on click to edit
    $('.profileEdits').click(function(event){
        event.preventDefault();
        $(this).parent().parent().find('.account-profile-fields').removeAttr("disabled");
        $(this).parent().parent().find('.profile-page-button').css('display','inline-block');
        $(this).css({"display": "block","visibility": "hidden"});
    });

    // Filter 
    $('#sidebar input').change(function() {
    if ($(this).prop('checked')===true){  
            $('.clearFilterBtn').css("display","inline-block");
        }else{
            $('.clearFilterBtn').css("display","none");
        }
    });

    $('.clearFilterBtn').click(function() {
        $('#sidebar input').attr('checked', false);
        $(this).css("display","none");
    });



    // Pincode dropdown select
    var telInput = $(".phone"),
	  errorMsg = $("#error-msg"),
	  validMsg = $("#valid-msg");

	// initialise plugin
	telInput.intlTelInput({

	  allowExtensions: true,
	  formatOnDisplay: true,
	  autoFormat: true,
	  autoHideDialCode: true,
	  autoPlaceholder: true,
	  defaultCountry: "auto",
	  ipinfoToken: "yolo",

	  nationalMode: false,
	  numberType: "MOBILE",
	  //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
	  preferredCountries: ['sa', 'ae', 'qa','om','bh','kw','ma'],
	  preventInvalidNumbers: true,
	  separateDialCode: true,
	  initialCountry: "auto",
	  geoIpLookup: function(callback) {
	  $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
	    var countryCode = (resp && resp.country) ? resp.country : "";
	    callback(countryCode);
	  });
	},
	   // utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.9/js/utils.js"
	});

	// var reset = function() {
	//   telInput.removeClass("error");
	//   errorMsg.addClass("hide");
	//   validMsg.addClass("hide");
	// };

	// // on blur: validate
	// telInput.blur(function() {
	//   reset();
	//   if ($.trim(telInput.val())) {
	//     if (telInput.intlTelInput("isValidNumber")) {
	//       validMsg.removeClass("hide");
	//     } else {
	//       telInput.addClass("error");
	//       errorMsg.removeClass("hide");
	//     }
	//   }
	// });

	// // on keyup / change flag: reset
	// telInput.on("keyup change", reset);


	// JS For Inanna
	// $('.tickerSlider .products-swiper').slick({
	//   infinite: true,
	//   slidesToShow: 1,
	//   slidesToScroll: 1,
	//   arrows: true
	// });

	$('.homeBannerInn').slick({
	  infinite: true,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  arrows:false
	});

	//Bestsaller Product Slider
	$('.productSlider').slick({
	 	infinite: false,
	  	slidesToShow: 4,
	  	slidesToScroll: 1,
	  	responsive: [
		    {
		      	breakpoint: 800,
			    settings: {
			        slidesToShow: 2,
			        slidesToScroll: 1,
			    }
		    },
		    {
		      	breakpoint: 600,
		      	settings: {
		        	slidesToShow: 1,
			        slidesToScroll: 1,
		      	}
		    }
	  	]
	});

	//Instagram Slider
	$('.instagramSlider').slick({
	  	infinite: true,
	  	slidesToShow: 4,
	  	slidesToScroll: 1,
	  	centerMode: true,
	  	responsive: [
		    {
		      	breakpoint: 800,
			    settings: {
			        slidesToShow: 2,
			        slidesToScroll: 1,
			    }
		    },
		    {
		      	breakpoint: 600,
		      	settings: {
		        	slidesToShow: 1,
			        slidesToScroll: 1,
		      	}
		    }
	  	]
	});

	// Product Inner Main Slider
	$('.productInnerMainSlider').slick({
	    dots:false,
	    infinite: true,
	    speed: 300,
	    slidesToShow:2,
	    centerPadding: '250px',
	    centerMode: true,
	    responsive: [
		    {
		      	breakpoint: 1199,
			    settings: {
			        slidesToShow: 2,
			        slidesToScroll: 1,
			        centerPadding: '100px',
			    }
		    },
		    {
		      	breakpoint: 768,
			    settings: {
			        slidesToShow: 1,
			        slidesToScroll: 1,
			        centerMode:false,
			    }
		    },
	  	]
	});
});