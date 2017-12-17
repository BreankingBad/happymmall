/*
* @Author: mxm
* @Date:   2017-12-06 21:56:25
* @Last Modified by:   mxm
* @Last Modified time: 2017-12-17 22:48:30
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

		// 验证用户名是否可用
		$('#username').blur(function(){
			var username = $.trim($(this).val());
			// 如果用户名为空，则忽略检查
			if(!username){
				return;
			}
			_user.checkUserName(username,function(res){
				formError.hide();
			},function(errMsg){
				formError.show(errMsg);
			});
		});
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
			passwordConfirm : $.trim($('#password-confirm').val()),
			phone : $.trim($('#phone').val()),
			email : $.trim($('#email').val()),
			question : $.trim($('#question').val()),
			answer : $.trim($('#answer').val()),
			password : $.trim($('#password').val())
		};
		var validateResult = this.formValidata(formData);
		if(validateResult.status) {
			_user.register(formData, function(res){
				window.location.href = './result.html?type=register ';
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
		if(!utils.validate(formData.password, 'require')){
			result.msg = '密码不能为空';
			return result;
		}
		if(!utils.validate(formData.passwordConfirm, 'require')){
			result.msg = '密码确认不能为空';
			return result;
		}
		if(formData.password.length < 6){
			result.msg = '密码长度不能小于6位';
			return result;
		}
		if(formData.password !== formData.passwordConfirm){
			result.msg = '两次输入的密码不一致';
			return result;
		}
		if(!utils.validate(formData.phone, 'phone')){
			result.msg = '手机号输入有误';
			return result;
		}
		if(!utils.validate(formData.email, 'email')){
			result.msg = '邮箱格式有误';
			return result;
		}
		if(!utils.validate(formData.question, 'require')){
			result.msg = '密码提示问题不能为空';
			return result;
		}
		if(!utils.validate(formData.answer, 'require')){
			result.msg = '密码提示答案不能为空';
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