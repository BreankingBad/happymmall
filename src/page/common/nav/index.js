/*
* @Author: mxm
* @Date:   2017-12-10 23:08:45
* @Last Modified by:   mxm
* @Last Modified time: 2018-01-21 20:19:17
*/
require('./index.css');

var utils = require('utilDir/utils.js');
var _user = require('serviceDir/user-service.js');
var _cart = require('serviceDir/cart-service.js');

var nav = {
	init : function() {
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();

		return this;
	},
	bindEvent : function() {
		$('.js-login').click(function(){
			utils.doLogin();
		});
		$('.js-register').click(function(){
			window.location.href = './user-register.html';
		});
		$('.js-logout').click(function(){
			_user.logout(function(res){
				window.location.reload();
			},function(errMsg){
				utils.errorTips(errMsg);
			});
		});

	},
	//加载用户信息
    loadUserInfo : function () {
        _user.checkLogin(function (res) {
            $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
        },function (errMsg) {
            console.log(errMsg);
        })
    },
    //加载购物车数量
    loadCartCount : function () {
        _cart.getCartCount(function (res) {
            $('.nav .cart-count').text(res || 0);
        },function (errMsg) {
            $('.nav .cart-count').text(0);
        })
    } 

};

module.exports = nav.init();