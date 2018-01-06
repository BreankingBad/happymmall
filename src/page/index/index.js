/*
* @Author: mxm
* @Date:   2017-12-05 23:20:59
* @Last Modified by:   mxm
* @Last Modified time: 2018-01-06 17:52:58
*/
'use strict';

require('./index.css');
require('pageDir/common/nav/index.js');
require('pageDir/common/header/index.js');
require('utilDir/slider/index.js');
var navSide = require('pageDir/common/nav-side/index.js');
var templateBanner = require('./index.string');
var utils = require('utilDir/utils.js');


$(function() {

	var bannerHtml = utils.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
    var $slider = $('.banner').unslider({
    	"dots" : true
    });

    $('.banner-con .banner-arrow').click(function(){
    	var forward = $(this).hasClass('prev') ? 'prev' : 'next';
    	$slider.data('unslider')[forward]();  
    });
});