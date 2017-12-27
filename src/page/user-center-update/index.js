/*
* @Author: mxm
* @Date:   2017-12-26 21:07:25
* @Last Modified by:   mxm
* @Last Modified time: 2017-12-27 22:56:08
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
		this.bindEvent();
	},
	onLoad : function() {
		navSide.init({
			name : 'user-center'
		});
		this.loadUserInfo();
	},
	bindEvent : function() {
		var _this = this;
		// 因为html是后面获取数据后才渲染的，所以如果此时用普通的绑定点击事件的方法，那么会绑定不上，
		// 所以用$(document).on
		$(document).on('click','.btn-submit',function() {
			var userInfo = {
				phone : $.trim($("#phone").val()),
				question : $.trim($("#question").val()),
				answer : $.trim($("#answer").val()),
				email : $.trim($("#email").val()),
			};
			var validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				_user.updateUserInfo(userInfo,function(res,msg){
					utils.successTips(msg);
					window.location.href = './user-center.html';
				},function(errMsg){
					utils.errorTips(errMsg);
				});
			}else{
				utils.errorTips(validateResult.msg)
			}
		});
	},
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = utils.renderHtml(templateIndex,res);
			$('.panel-body').html(userHtml);
		},function(errMsg) {
			 console.log(errMsg);
		})
	},
	validateForm : function(formData) {
		var result = {
			status : false,
			msg	   : ''
		};
		
		
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