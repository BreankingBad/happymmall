/*
* @Author: mxm
* @Date:   2017-12-13 20:31:13
* @Last Modified by:   mxm
* @Last Modified time: 2017-12-28 20:57:34
*/
require('./index.css');

var utils = require('utilDir/utils.js');
var templateIndex = require('./index.string');

// 通用页面头部
var navSide = {
	option : {
		name : '',
		navList : [
			{name : 'user-center', desc : '个人中心', href : './user-center.html'},
			{name : 'order-list', desc : '我的订单', href : './order-list.html'},
			{name : 'user-pass-update', desc : '密码修改', href : './user-pass-update.html'},
			{name : 'about', desc : '关于mmall', href : './about.html'}
		]
	},
	init : function(option){
		// 合并选项
		$.extend(this.option, option);
		this.renderNav();
	},
	renderNav : function() {
		for (var i = 0; i < this.option.navList.length; i++) {
			if(this.option.name === this.option.navList[i].name){
				this.option.navList[i].isActive = true;
			}
		}

		var navHtml = utils.renderHtml(templateIndex,{
			navList : this.option.navList
		});
		$('.nav-side').html(navHtml);
	}
};

module.exports = navSide;