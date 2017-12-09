/*
* @Author: mxm
* @Date:   2017-12-05 23:20:59
* @Last Modified by:   mxm
* @Last Modified time: 2017-12-10 00:15:54
*/
'use strict';

require('./index.css');

var utils = require('utilDir/utils.js');

console.log('hello index');

$('body').html('hello ind');

utils.request({
	url : '/product/list.do?keyword=1',
	success : function(res){
		console.log(res);
	},
	error : function(err){
		console.log(err);
	}
});