/*
* @Author: mxm
* @Date:   2018-02-03 12:36:40
* @Last Modified by:   mxm
* @Last Modified time: 2018-02-03 12:43:02
*/
'use strict';

var utils = require('utilDir/utils.js');
var _address = {
    //获取地址列表
    getAddressList : function(resolve,reject){
        utils.request({
            url:utils.getServerUrl('/shipping/list.do'),
            data : {
                pageSize : 50
            },
            success : resolve,
            error : reject
        })
    },
    //新建收件人
    save : function(addressInfo,resolve,reject){
        utils.request({
            url:utils.getServerUrl('/shipping/add.do'),
            data : addressInfo,
            success : resolve,
            error : reject
        })
    },
    //更新收件人
    update : function(addressInfo,resolve,reject){
        utils.request({
            url:utils.getServerUrl('/shipping/update.do'),
            data : addressInfo,
            success : resolve,
            error : reject
        })
    },
    //删除收件人
    deleteAddress : function(shippingId,resolve,reject){
        utils.request({
            url:utils.getServerUrl('/shipping/del.do'),
            data : {
                shippingId : shippingId
            },
            success : resolve,
            error : reject
        })
    },
    //获取单条地址信息
    getAddress : function(shippingId,resolve,reject){
        utils.request({
            url:utils.getServerUrl('/shipping/select.do'),
            data : {
                shippingId : shippingId
            },
            success : resolve,
            error : reject
        })
    },
}

module.exports = _address;