/*
* @Author: mxm
* @Date:   2018-02-04 21:32:58
* @Last Modified by:   mxm
* @Last Modified time: 2018-02-04 21:35:58
*/
'use strict';
require('./index.css')
require('pageDir/common/nav/index.js');
require('pageDir/common/header/index.js');
var navSide = require('pageDir/common/nav-side/index.js');
var utils = require('utilDir/utils.js');
var _payment = require('serviceDir/payment-service.js');
var templateIndex = require('./index.string');


// page逻辑部分
var page = {
    data : {
        orderNumber : utils.getUrlParam('orderNumber')
    },
    init : function () {
        this.onLoad();
    },
    onLoad : function () {
        //加载detail数据
        this.loadPaymentInfo();
    },

    loadPaymentInfo : function () {
        var paymentHtml = '',
            _this = this,
            $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>')
        _payment.getPaymentInfo(this.data.orderNumber,function (res) {
            //渲染html
            paymentHtml = utils.renderHtml(templateIndex,res);
            $pageWrap.html(paymentHtml);
            _this.listenOrderStatus();
        },function (errMsg) {
            $content.html("<p class='err-tip'>" + errMsg + "</p>");
        })
    },
    //监听订单状态
    listenOrderStatus : function () {
        var _this = this;
        this.paymentTimer = window.setInterval(function () {
            _payment.getPaymentStatus(_this.data.orderNumber,function (res) {
                if (res == true){
                    window.location.href = './result.html?type=payment&orderNumber='+_this.data.orderNumber;
                }
            })
        },5e3)
    }

};
$(function () {
    page.init();
})