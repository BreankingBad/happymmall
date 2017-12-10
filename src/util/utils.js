/*
* @Author: mxm
* @Date:   2017-12-09 21:47:18
* @Last Modified by:   mxm
* @Last Modified time: 2017-12-10 11:18:02
*/

var Hogan = require('hogan');

var conf = {
	serverHost : ''
};

var utils = {
	request : function(param) {
		var _this = this;
		$.ajax({
			type		: param.method  ||  'get',
			url			: param.url		||  '',
			dataType	: param.type 	||  'json',
			data 		: param.data 	||  '',
			success		: function(res) {
				// 请求成功
				if (0 === res.status) {
					typeof param.success === 'function' && param.success(res.data, res.msg);

				} 
				// 没有登录状态，需要重新登录
				else if (10 === res.status) {
					_this.doLogin();
				}
				// 请求数据错误
				else if(1 === res.status){
					typeof param.error === 'function' && param.error(res.msg);
				}
			},
			error		: function(err) {
				typeof param.error === 'function' && param.error(err.statusText);
			}
		});
	},

	// 获取服务器地址,可以在这做统一的处理
	getServerUrl : function(path) {
		return conf.serverHost + path;
	},
	// 获取URL参数
	getUrlParam : function(name){
		var reg = new RegExp('(^|&)' + name +'=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	// 渲染html模版
	renderHtml : function(htmlTemplate, data) {
		var template = Hogan.compile(htmlTemplate);
		result = template.render(data);
		return result;
	},
	// 统一登录处理
	doLogin : function(){
		window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
	}
};


module.exports = utils;