
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
	}
};

module.exports = _user;