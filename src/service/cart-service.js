/*
* @Author: mxm
* @Date:   2017-12-17 23:02:13
* @Last Modified by:   mxm
* @Last Modified time: 2017-12-17 23:20:33
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
    }
}

module.exports = _cart;