/*
* @Author: mxm
* @Date:   2017-12-26 21:07:25
* @Last Modified by:   mxm
* @Last Modified time: 2017-12-28 21:45:02
*/
'use strict';
require('./index.css');
require('pageDir/common/nav/index.js');
require('pageDir/common/header/index.js');
var navSide = require('pageDir/common/nav-side/index.js');
var utils = require('utilDir/utils.js');
var _user = require('serviceDir/user-service.js');


var page = {
	init : function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function() {
		navSide.init({
			name : 'user-pass-update'
		});
		this.loadUserInfo();
	},
	bindEvent : function() {
		var _this = this;
		// 因为html是后面获取数据后才渲染的，所以如果此时用普通的绑定点击事件的方法，那么会绑定不上，
		// 所以用$(document).on
		$(document).on('click','.btn-submit',function() {
			var userInfo = {
				password : $.trim($("#password").val()),
				passwordNew : $.trim($("#password-new").val()),
				passwordConfirm : $.trim($("#password-confirm").val()),
			};
			var validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				_user.updatePassword({
					passwordOld : userInfo.password,
					passwordNew : userInfo.passwordNew
				},function(res,msg){
					utils.successTips(msg);
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

		},function(errMsg) {
			 console.log(errMsg);
		})
	},
	validateForm : function(formData) {
		var result = {
			status : false,
			msg	   : ''
		};
		
		
		if(!utils.validate(formData.password, 'require')){
			result.msg = '原密码不能为空';
			return result;
		}
		if(!formData.passwordNew || formData.passwordNew.length < 6){
			result.msg = '密码长度不得小于6位';
			return result;
		}
		if(formData.passwordNew  !== formData.passwordConfirm){
			result.msg = '两次密码不一致';
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