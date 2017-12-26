/*
* @Author: mxm
* @Date:   2017-12-26 21:07:25
* @Last Modified by:   mxm
* @Last Modified time: 2017-12-26 22:30:11
*/
'use strict';
require('./index.css');
require('pageDir/common/nav/index.js');
require('pageDir/common/header/index.js');
var navSide = require('pageDir/common/nav-side/index.js');
var utils = require('utilDir/utils.js');
var _user = require('serviceDir/user-service.js');
var templateIndex = require('./index.string');

var page = {
	init : function() {
		this.onLoad();
	},
	onLoad : function() {
		navSide.init({
			name : 'user-center'
		});
		this.loadUserInfo();
	},
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = utils.renderHtml(templateIndex,res);
			$('.panel-body').html(userHtml);
		},function(errMsg) {
			 console.log(errMsg);
		})
	}
};

$(function(){
	page.init();
});