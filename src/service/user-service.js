
var utils = require('utilDir/utils.js');

var _user = {
	login : function(userInfo, resolve, reject){
			utils.request({
			url  	: utils.getServerUrl('/user/login.do'),
			data 	: userInfo,
			method  : 'POST',
			success : resolve,
			error	: reject
		});
	},
	checkUserName : function(username, resolve, reject){
		utils.request({
			url  	: utils.getServerUrl('/user/check_valid.do'),
			data 	: {
				type	: 'username',
				str		: username
			},
			method  : 'POST',
			success : resolve,
			error	: reject
		});
	},
	register : function(userInfo, resolve, reject){
		utils.request({
			url  	: utils.getServerUrl('/user/register.do'),
			data 	: userInfo,
			method  : 'POST',
			success : resolve,
			error	: reject
		});
	}
};

module.exports = _user;