/*
* @Author: mxm
* @Date:   2017-12-17 23:02:13
* @Last Modified by:   mxm
* @Last Modified time: 2018-01-21 19:53:23
*/
'use strict';

var utils = require('utilDir/utils.js');
var _cart = {
    //获取购物车数量
    getCartCount : function(resolve,reject){
        utils.request({
            url 	: utils.getServerUrl('/cart/get_cart_product_count.do'),
            method 	:'POST',
            success : resolve,
            error 	: reject
        })
    },
     //获取购物车列表
     getCartList : function(resolve,reject){
         utils.request({
             url     : utils.getServerUrl('/cart/list.do'),
             success : resolve,
             error   : reject
         })
     },
      addToCart: function (productInfo, resolve, reject) {
          utils.request({
            url     :  utils.getServerUrl('/cart/add.do'),
            data    :  productInfo,
            success :  resolve,
            error   :  reject
          })
      },
         // 选择购物车商品
     selectProduct: function (productId, resolve, reject) {
         utils.request({
             url: utils.getServerUrl('/cart/select.do'),
             data: {
                 productId: productId
             },
             success: resolve,
             error: reject
         })
     },
     // 取消选择购物车商品
     unselectProduct: function (productId, resolve, reject) {
         utils.request({
             url: utils.getServerUrl('/cart/un_select.do'),
             data: {
                 productId: productId
             },
             success: resolve,
             error: reject
         })
     },
     // 取消全部选择购物车商品
     unselectAllProduct: function (resolve, reject) {
         utils.request({
             url: utils.getServerUrl('/cart/un_select_all.do'),
             success: resolve,
             error: reject
         })
     },
     // 选择全部选择购物车商品
     selectAllProduct: function (resolve, reject) {
         utils.request({
             url: utils.getServerUrl('/cart/select_all.do'),
             success: resolve,
             error: reject
         })
     },
     // 更新购物车商品数量
     updateProduct : function (productInfo, resolve, reject) {
         utils.request({
             url: utils.getServerUrl('/cart/update.do'),
             data: productInfo,
             success: resolve,
             error: reject
         })
     },
     //删除指定商品
     deleteProduct : function (productIds, resolve, reject) {
	     utils.request({
	         url: utils.getServerUrl('/cart/delete_product.do'),
	         data: {
	             productIds : productIds
	         },
	         success: resolve,
	         error: reject
	     });
 	},
     //添加到购物车
    addToCart : function (productInfo, resolve, reject) {
        utils.request({
            url:utils.getServerUrl('/cart/add.do'),
            data:productInfo,
            success : resolve,
            error : reject
        });
    }   
};

module.exports = _cart;