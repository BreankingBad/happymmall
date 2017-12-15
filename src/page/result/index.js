/*
* @Author: mxm
* @Date:   2017-12-14 21:46:06
* @Last Modified by:   mxm
* @Last Modified time: 2017-12-16 00:15:02
*/
require('./index.css');

var navSimple = require('pageDir/common/nav_simple/index.js');
var utils = require('utilDir/utils.js');

// $(function() { ... }); is just jQuery short-hand for $(document).ready(function() { ... });
$(function(){
	var type = utils.getUrlParam('type') || 'default';
	$element = $("." + type + '-success');
	// 显示对应的提示元素
	$element.show();
});