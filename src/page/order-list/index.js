/*
* @Author: mxm
* @Date:   2018-02-03 23:06:14
* @Last Modified by:   mxm
* @Last Modified time: 2018-02-04 13:48:58
*/
'use strict';
require('./index.css')
require('pageDir/common/nav/index.js');
require('pageDir/common/header/index.js');
var navSide = require('pageDir/common/nav-side/index.js');
var utils = require('utilDir/utils.js');
var _order = require('serviceDir/order-service.js');
var Pagination = require('utilDir/pagination/index.js');
var templateIndex = require('./index.string');


// page逻辑部分
var page = {
    data : {
        listParam : {
            pageNum : 1,
            pageSize : 10
        }
    },
    init : function () {
        this.onLoad();
    },
    onLoad : function () {
        this.loadOrderList();
        // 初始化左侧菜单
        navSide.init({
            name : 'order-list'
        })
    },
    //加载订单列表
    loadOrderList : function () {
        var orderListHtml = '',
            _this = this,
            $listCon = $('.order-list-con');
        $listCon.html('<div class="loading"></div>')
        _order.getOrderList(this.data.listParam,function (res) {
            //渲染html
            orderListHtml = utils.renderHtml(templateIndex,res);
            $listCon.html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            })
        },function (errMsg) {
            $listCon.html("<p class='err-tip'>加载订单失败,请刷新后重试</p>")
        })
    },
    //加载分页信息
    loadPagination : function (pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({},pageInfo,{
            container : $('.pagination'),
            onSelectPage : function (pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
};
$(function () {
    page.init();
})