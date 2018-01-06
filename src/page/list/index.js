/*
* @Author: mxm
* @Date:   2018-01-06 19:23:10
* @Last Modified by:   mxm
* @Last Modified time: 2018-01-06 20:28:33
*/
'use strict';
require('./index.css');
require('pageDir/common/nav/index.js');
require('pageDir/common/header/index.js');

var utils = require('utilDir/utils.js');
var _product = require('serviceDir/product-service.js');
var templateIndex = require('./index.string');

var page = {
	data : {
		listParam : {
			keyword : utils.getUrlParam('keyword')  || '',
			categoryId : utils.getUrlParam('categoryId')  || '',
			orderBy : utils.getUrlParam('orderBy')  || 'default',
			pageNum : utils.getUrlParam('pageNum')  || 1,
			pageSize : utils.getUrlParam('pageSize')  || 20

		}
	},
	init : function() {
		this.bindEvent();
		this.onLoad();
	},
	onLoad : function() {
		this.loadList();
	},
	bindEvent : function() {

	},
	loadList : function() {
		var listParam = this.data.listParam;
		var listHtml = '';
		var _this = this;
		_product.getProductList(listParam, function(res){
			listHtml = utils.renderHtml(templateIndex, {
				list : res.list
			});
			$('.p-list-con').html(listHtml);
			_this.loadPagination(res.pageNum, res.pages);
		},function(errMsg){
			utils.errorTips(errMsg);
		});
	},
	// 加载分页信息
	loadPagination : function(pageNum, pages) {

	}

};

$(function(){
	page.init(); 
});