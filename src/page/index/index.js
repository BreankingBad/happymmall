/*
* @Author: mxm
* @Date:   2017-12-05 23:20:59
* @Last Modified by:   mxm
* @Last Modified time: 2018-01-06 10:09:29
*/
'use strict';

require('./index.css');
require('pageDir/common/nav/index.js');
require('pageDir/common/header/index.js');
var navSide = require('pageDir/common/nav-side/index.js');
var utils = require('utilDir/utils.js');




// console.log('hello index');

// $('body').html('hello ind');

// utils.request({
// 	url : '/product/list.do?keyword=1',
// 	success : function(res){
// 		console.log(res);
// 	},
// 	error : function(err){
// 		console.log(err);
// 	}
// });

// console.log(utils.getUrlParam('test'));

// var html = '<div>{{data}}</div>';
// var data = {
// 	data : 'test'
// }
// console.log(utils.renderHtml(html,data));