"use strict";

var $ = require('jquery');
//
//var v = require('velocity');
//
//var IScroll = require('iscroll');

$(function () {
	//console.log('sdfsdf');

	$.fn.dontScrollParent = function() {
		this.bind('mousewheel DOMMouseScroll',function(e)
		{
			var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;

			if (delta > 0 && $(this).scrollTop() <= 0)
				return false;
			if (delta < 0 && $(this).scrollTop() >= this.scrollHeight - $(this).height())
				return false;

			return true;
		});
	};


	$('.child').dontScrollParent();


//	var myScroll = new IScroll('#left-menu', {
//		scrollbars: true,
//		mouseWheel: true,
//		interactiveScrollbars: true,
//		shrinkScrollbars: 'scale',
//		fadeScrollbars: true
//	});
//
//	var myScroll2 = new IScroll('#right-menu', {
//		scrollbars: true,
//		mouseWheel: true,
//		interactiveScrollbars: true,
//		shrinkScrollbars: 'scale',
//		fadeScrollbars: true
//	});
//
//	var myScroll3 = new IScroll('#main-content', {
//		scrollbars: true,
//		mouseWheel: true,
//		interactiveScrollbars: true,
//		shrinkScrollbars: 'scale',
//		fadeScrollbars: true,
//		click: true,
//		preventDefaultException:{
//			//tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/,
//			className: /(^|\s)canselect(\s|$)/
//		}
//	});

//	$('.toggle-menu-left-button').on('click', function () {
//		var that = $(this);
//		var menuwidth = $('.menu-left-nav').width();
//		var dir;
//		if (that.hasClass('open')) {
//			dir = '-';
//			that.removeClass('open')
//		} else {
//			dir = '+';
//			that.addClass('open')
//		}
//		$(".slidepanel").animate({left: dir+'='+menuwidth, right: (dir === '-' ? '+' : '-') +'='+menuwidth}, 'fast');
//	});



//	$('.showrightmenu-button').on('click', function () {
//		var that = $(this);
//		var dir;
//		if (that.hasClass('open')) {
//			dir = '+';
//			that.removeClass('open')
//		} else {
//			dir = '-';
//			that.addClass('open')
//		}
//		$(".slidepanel").animate({left: dir+'=80%', right: (dir === '-' ? '+' : '-') +'=80%' }, 'fast');
//	})




});





module.exports = function () {



	
};