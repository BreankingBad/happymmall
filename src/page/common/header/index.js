/*
* @Author: mxm
* @Date:   2017-12-11 23:33:19
* @Last Modified by:   mxm
* @Last Modified time: 2017-12-12 21:33:58
*/
require('./index.css');

var utils = require('utilDir/utils.js');

// 通用页面头部
var header = {
	init : function(){
		console.log('init');
		this.bindEvent();
	},
	onLoad : function() {
		var keyword = utils.getUrlParam('keyword');
		// keyword存在，则回填输入框
		if(keyword){
			$('#search-input').val(keyword);
		}
	},
	bindEvent : function(){
		var _this = this;
		// 点击搜索按钮
		$('#search-btn').click(function() {
			_this.searchSubmit();
		});
		// 输入回车键，则搜索提交
		$('#search-input').keyup(function(e) {
			if(e.keyCode === 13) {
				_this.searchSubmit();
			}
		});
	},
	// 搜索的提交
	searchSubmit : function(){
		console.log('searchSubmit');
		var keyword = $.trim($('#search-input').val());
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}else{
			utils.goHome();
		}
	}

};

header.init();