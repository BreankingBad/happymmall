/*
* @Author: mxm
* @Date:   2018-02-04 21:41:33
* @Last Modified by:   mxm
* @Last Modified time: 2018-02-04 21:41:54
*/
'use strict';

var utils = require('utilDir/utils.js');
var _payment = {
    //获取支付信息
    getPaymentInfo : function(orderNumber,resolve,reject){
        utils.request({
            url:utils.getServerUrl('/order/pay.do'),
            data : {
                orderNo : orderNumber
            },
            success : resolve,
            error : reject
        })
    },
    //获取订单状态
    getPaymentStatus : function(orderNumber,resolve,reject){
        utils.request({
            url:utils.getServerUrl('/order/query_order_pay_status.do'),
            data : {
                orderNo : orderNumber
            },
            success : resolve,
            error : reject
        })
    },
}

module.exports = _payment;