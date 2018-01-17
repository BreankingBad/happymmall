/*
* @Author: mxm
* @Date:   2018-01-06 19:23:10
* @Last Modified by:   mxm
* @Last Modified time: 2018-01-12 01:05:04
*/
'use strict';
require('./index.css');
require('pageDir/common/nav/index.js');
require('pageDir/common/header/index.js');

var utils = require('utilDir/utils.js');
var _product = require('serviceDir/product-service.js');
var templateIndex = require('./index.string');
var Pagination = require('utilDir/pagination/index.js');

var page = {
	data : {
		listParam : {
			keyword : utils.getUrlParam('keyword')  || '',
			categoryId : utils.getUrlParam('categoryId')  || '',
			orderBy : utils.getUrlParam('orderBy')  || 'default',
			pageNum : utils.getUrlParam('pageNum')  || 1,
			pageSize : utils.getUrlParam('pageSize')  || 10

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
		var _this = this;
		// 排序的点击事件
		$('.sort-item').click(function(){
			var $this = $(this);
			_this.data.listParam.pageNum = 1;
			// 点击默认排序
			if($this.data('type') === 'default'){
				if($this.hasClass('active')){
					return;
				} else {
					$this.addClass('active').siblings('.sort-item')
					.removeClass('active asc desc');
					_this.data.listParam.orderBy = 'default';
				}
			} else if($this.data('type') === 'price'){
				$this.addClass('active').siblings('.sort-item')
					.removeClass('active asc desc');
				if($this.hasClass('asc')){
					$this.addClass('desc').removeClass('asc');
					_this.data.listParam.orderBy = 'price_desc';
				}else{
					$this.addClass('asc').removeClass('desc');
					_this.data.listParam.orderBy = 'price_asc';
				}
			}

   			// 重新加载列表
			_this.loadList();
		});
	},
	loadList : function() {
		var listParam = this.data.listParam;
		var listHtml = '';
		var _this = this;
		var $pListCon = $('.p-list-con');

		$pListCon.html('<div class="loading"></div>');
		// 删除参数中不必要的字段
		listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);

		_product.getProductList(listParam, function(res){
			listHtml = utils.renderHtml(templateIndex, {
				list : res.list
			});
			$('.p-list-con').html(listHtml);
			_this.loadPagination({
                  hasPreviousPage : res.hasPreviousPage,
                  prePage         : res.prePage,
                  hasNextPage     : res.hasNextPage,
                  nextPage        : res.nextPage,
                  pageNum         : res.pageNum,
                  pages           : res.pages
			});
		},function(errMsg){
			utils.errorTips(errMsg);
		});
	},
	// 加载分页信息
	loadPagination : function(pageInfo) {
		var _this = this;
		this.pagination ? '' : (this.pagination = new Pagination());
		this.pagination.render($.extend({},pageInfo,{
			container  : $('.pagination'),
			onSelectPage : function(pageNum){
				_this.data.listParam.pageNum = pageNum;
				_this.loadList();
			}
		}));
	}

};

$(function(){
	page.init(); 
});