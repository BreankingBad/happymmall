/*
* @Author: mxm
* @Date:   2018-02-04 13:56:16
* @Last Modified by:   mxm
* @Last Modified time: 2018-02-04 14:05:15
*/
'use strict';
require('./index.css')
require('pageDir/common/nav/index.js');
require('pageDir/common/header/index.js');
var navSide = require('pageDir/common/nav-side/index.js');
var utils = require('utilDir/utils.js');
var _order = require('serviceDir/order-service.js');
var templateIndex = require('./index.string');


// page逻辑部分
var page = {
    data : {
        orderNumber : utils.getUrlParam('orderNumber')
    },
    init : function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function () {
        // 初始化左侧菜单
        navSide.init({
            name : 'order-list'
        })
        //加载detail数据
        this.loadDetail();
    },
    bindEvent : function () {
        var _this = this;
        $(document).on('click','.order-cancel',function () {
            if(window.confirm('确实要取消该订单吗?')){
                _order.cancelOrder(_this.data.orderNumber,function (res) {
                    utils.successTips('该订单取消成功');
                    _this.loadDetail();
                },function (errMsg) {
                    utils.errorTips(errMsg);
                })
            }
        })
    },
    //加载订单列表
    loadDetail : function () {
        var orderDetailHtml = '',
            _this = this,
            $content = $('.content');
        $content.html('<div class="loading"></div>')
        _order.getOrderDetail(this.data.orderNumber,function (res) {
            _this.dataFilter(res);
            //渲染html
            orderDetailHtml = utils.renderHtml(templateIndex,res);
            $content.html(orderDetailHtml);
        },function (errMsg) {
            $content.html("<p class='err-tip'>" + errMsg + "</p>");
        })
    },
    //数据的适配
    dataFilter : function (data) {
        data.needPay = data.status == 10 ;
        data.isCancelable = data.status == 10 ;
    }
};
$(function () {
    page.init();
})