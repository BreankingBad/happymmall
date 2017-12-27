
var utils = require('utilDir/utils.js');

var _user = {
	 //检查登录状态
    checkLogin : function(resolve,reject){
        utils.request({
            url 	: utils.getServerUrl('/user/get_user_info.do'),
            method 	: 'POST',
            success : resolve,
            error 	: reject
        })
    },
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
	checkAnswer : function(userInfo, resolve, reject){
		utils.request({
			url  	: utils.getServerUrl('/user/forget_check_answer.do'),
			data 	: userInfo,
			method  : 'POST',
			success : resolve,
			error	: reject
		});
	},
	resetPassword : function(userInfo, resolve, reject){
		utils.request({
			url  	: utils.getServerUrl('/user/forget_reset_password.do'),
			data 	: userInfo,
			method  : 'POST',
			success : resolve,
			error	: reject
		});
	},
	getQuestion : function(username, resolve, reject){
		utils.request({
			url  	: utils.getServerUrl('/user/forget_get_question.do'),
			data 	: {
				username : username
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
	},
	//登出
    logout : function(resolve,reject){
        utils.request({
            url:utils.getServerUrl('/user/logout.do'),
            method:'POST',
            success : resolve,
            error : reject
        })
    },	
    // 获取用户信息
    getUserInfo : function(resolve,reject){
        utils.request({
            url:utils.getServerUrl('/user/get_information.do'),
            method:'POST',
            success : resolve,
            error : reject
        })
    },
    updateUserInfo : function(userInfo, resolve, reject){
		utils.request({
			url  	: utils.getServerUrl('/user/update_information.do'),
			data 	: userInfo,
			method  : 'POST',
			success : resolve,
			error	: reject
		});
	},
};

module.exports = _user;