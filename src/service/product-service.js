/*
* @Author: mxm
* @Date:   2018-01-06 19:26:56
* @Last Modified by:   mxm
* @Last Modified time: 2018-01-17 20:50:01
*/

var utils = require('utilDir/utils.js');

var _product = {
	getProductList : function(listParam, resolve, reject){
			utils.request({
			url  	: utils.getServerUrl('/product/list.do'),
			data 	: listParam,
			method  : 'POST',
			success : resolve,
			error	: reject
		});
	},

    //获取商品详细信息
    getProductDetail : function(productId,resolve,reject){
        utils.request({
            url:utils.getServerUrl('/product/detail.do'),
            data:{
                productId : productId
            },
            success : resolve,
            error : reject

        });
      }
};

module.exports = _product;