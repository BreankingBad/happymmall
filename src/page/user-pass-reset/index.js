/*
* @Author: mxm
* @Date:   2017-12-06 21:56:25
* @Last Modified by:   mxm
* @Last Modified time: 2017-12-20 23:10:56
*/


'use strict';

require('./index.css');

var navSimple = require('pageDir/common/nav_simple/index.js');
var utils = require('utilDir/utils.js');
var _user = require('serviceDir/user-service.js');

// 表单错误提示
var formError = {
	show : function(errMsg) {
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide : function() {
		$('.error-item').hide().find('.err-msg').text('');
	}
};


var page = {
	data : {
		username : '',
		question : '',
		answer   : '',
		token	 : ''
	},
	init : function() {
		this.bindEvent();
		this.load();
	},
	bindEvent : function() {
		var _this = this;
		$('#submit-username').click(function(){
			var username = $.trim($('#username').val());
			if(username) {
				_user.getQuestion(username, function(res){
					_this.data.username = username;
					_this.data.question = res;
					_this.showStepQuestion();
				}, function(errMsg){
					formError.show(errMsg);
				});
			} else {
				formError.show('请输入用户名');
			}
		});

		$('#submit-question').click(function(){
			var answer = $.trim($('#answer').val());
			if(answer) {
				_user.checkAnswer({
					username : _this.data.username,
					question : _this.data.question,
					answer   : answer
				}, function(res){
					_this.data.answer = answer;
					_this.data.token = res;
					_this.showStepPassword();
				}, function(errMsg){
					formError.show(errMsg);
				});
			} else {
				formError.show('请输入问题提示答案');
			}
		});

		$('#submit-password').click(function(){
			console.log('reset');
			var password = $.trim($('#password').val());
			if(password && password.length >= 6) {
				console.log('go');
				_user.resetPassword({
					username : _this.data.username,
					passwordNew : password,
					forgetToken   : _this.data.token
				}, function(res){
					window.location.href = './result.html?type=pass-reset';
				}, function(errMsg){
					formError.show(errMsg);
				});
			} else {
				formError.show('请输入不少于6位的新密码');
			}
		});
	},
	load : function() {
		this.showStepUserName();
	},
	showStepUserName : function(){
		this.hideAllStep();
		$('.step-username').show();
	},
	showStepQuestion : function(){
		this.hideAllStep();
		$('.step-question').show();
		$('.step-question .question').text(this.data.question);
	},
	showStepPassword : function(){
		this.hideAllStep();
		$('.step-password').show();
	},
	hideAllStep : function() {
		formError.hide();
		$('.step-con').hide();
	}

};

$(function(){
	page.init();
});