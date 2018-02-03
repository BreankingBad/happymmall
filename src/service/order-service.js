/*
* @Author: mxm
* @Date:   2018-02-03 12:53:16
* @Last Modified by:   mxm
* @Last Modified time: 2018-02-03 12:53:32
*/
'use strict';

var utils = require('utilDir/utils.js');
var _order = {
    //获取商品列表
    getProductList : function(resolve,reject){
        utils.request({
            url:utils.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error : reject
        })
    },
    //提交订单
    createOrder : function (orderInfo, resolve, reject) {
        utils.request({
            url:utils.getServerUrl('/order/create.do'),
            data : orderInfo,
            success : resolve,
            error : reject
        })
    },
    //获取订单列表
    getOrderList : function (listParam, resolve, reject) {
        utils.request({
            url:utils.getServerUrl('/order/list.do'),
            data : listParam,
            success : resolve,
            error : reject
        })
    },
    //获取订单详情
    getOrderDetail : function (orderNumber, resolve, reject) {
        utils.request({
            url:utils.getServerUrl('/order/detail.do'),
            data : {
                orderNo : orderNumber
            },
            success : resolve,
            error : reject
        })
    },
    //取消订单
    cancelOrder : function (orderNumber, resolve, reject) {
        utils.request({
            url:utils.getServerUrl('/order/cancel.do'),
            data : {
                orderNo : orderNumber
            },
            success : resolve,
            error : reject
        })
    },

}

module.exports = _order;