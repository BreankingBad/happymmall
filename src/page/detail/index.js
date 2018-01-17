/*
* @Author: mxm
* @Date:   2018-01-13 11:41:32
* @Last Modified by:   mxm
* @Last Modified time: 2018-01-17 21:31:18
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
		productId : utils.getUrlParam('productId')  || ''
	},
	init : function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function() {
		if(!this.data.productId){
			utils.goHome();
			return;
		}
		this.loadDetail();
	},
	bindEvent : function() {
		var _this = this;
		// 图片预览
		$(document).on('mouseenter','.p-img-item',function(){
			var imageUrl = $(this).find('.p-img').attr('src');
			$('.main-img').attr('src',imageUrl);
		});
		$(document).on('click','.p-count-btn',function(){
			var type = $(this).hasClass('plus') ? 'plus' : 'minus',
				$pCount = $('.p-count'),
				currCount = parseInt($pCount.val()),
				minCount = 1,
				maxCount = _this.data.detailInfo.stock || 1;

			if(type === 'plus') {
				$pCount.val(currCount < maxCount ? currCount + 1 : maxCount);

			}else if(type === 'minus') {
				$pCount.val(currCount > minCount ? currCount - 1 : minCount);
			}
		})

	},
	loadDetail : function() {
		var html = '',
			_this = this,
			$pageWrap = $('.page-wrap');

		$pageWrap.html('<div class="loading"></div>');
		_product.getProductDetail(this.data.productId, function(res){
			_this.filter(res);
			// 缓存detail的数据
			_this.data.detailInfo = res;
			html = utils.renderHtml(templateIndex, res);
			$pageWrap.html(html);
		},function(errMsg){
			$('.page-wrap').html('<p class="err-tip">此商品太淘气,找不到了</p>');
		});
	},
	// 数据匹配
	filter : function(data) {
		data.subImages = data.subImages.split(',');
	}

};

$(function(){
	page.init(); 
});