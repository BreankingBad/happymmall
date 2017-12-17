/*
* @Author: mxm
* @Date:   2017-12-06 21:56:25
* @Last Modified by:   mxm
* @Last Modified time: 2017-12-17 15:33:26
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
	init : function() {
		this.bindEvent();
	},
	bindEvent : function() {
		var _this = this;
		$('#submit').click(function(){
			_this.submit();
		});
		$('.user-content').keyup(function(e){
			if(e.keyCode === 13){
				_this.submit();
			}
		});
	},
	submit: function(){
		console.log('submit');
		var formData = {
			username : $.trim($('#username').val()),
			password : $.trim($('#password').val())
		};
		var validateResult = this.formValidata(formData);
		if(validateResult.status) {
			_user.login(formData, function(res){
				window.location.href = utils.getUrlParam('redirect') || './index.html';
			},function(errMsg){
				formError.show(errMsg);
			});
		}else {
			formError.show(validateResult.msg);
		}
	},
	formValidata : function(formData) {
		var result = {
			status : false,
			msg	   : ''
		};
		if(!utils.validate(formData.username, 'require')){
			result.msg = '用户名不能为空';
			return result;
		}
		else if(!utils.validate(formData.password, 'require')){
			result.msg = '密码不能为空';
			return result;
		}
		result.status = true;
		result.msg = '验证通过';
		return result;
	}

};

$(function(){
	page.init();
});