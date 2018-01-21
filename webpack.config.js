/*
* @Author: mxm
* @Date:   2017-12-06 21:18:51
* @Last Modified by:   mxm
* @Last Modified time: 2018-01-20 23:28:53
*/

 var webpack 			= require('webpack');
 var ExtractTextPlugin 	= require("extract-text-webpack-plugin");
 var HtmlWebpackPlugin 	= require('html-webpack-plugin');

var WEBPACK_ENV			= process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

// 获取html-webpack-plugin参数的方法
var getHtmlConfig 		= function(name,title){
	return {
        	template : './src/view/'+ name + '.html',
        	filename : 'view/'+ name + '.html',
        	title : title,
        	inject   : true,
        	hash 	 : true,
        	chunks 	 : ['common', name]
        };
};

 const path = require('path');

// 配置
 var config = {
     entry: {
     	'common' : ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'list' : ['./src/page/list/index.js'],
        'detail' : ['./src/page/detail/index.js'],
     	'cart' : ['./src/page/cart/index.js'],
        'user-login' : ['./src/page/user-login/index.js'],
        'user-register' : ['./src/page/user-register/index.js'],
        'user-center' : ['./src/page/user-center/index.js'],
        'user-center-update' : ['./src/page/user-center-update/index.js'],
        'user-pass-update' : ['./src/page/user-pass-update/index.js'],
     	'user-pass-reset' : ['./src/page/user-pass-reset/index.js'],
     	'result' : ['./src/page/result/index.js']
 	 },
     output: {
         path: path.resolve(__dirname, 'dist'),
         filename: 'js/[name].js',
         publicPath: '/dist'
     },
     externals: {
     	'jquery' : 'window.jQuery'
     },
     module: {
		loaders: [
				{test: /\.css$/,loader: 'style-loader!css-loader'},
				{test:/\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,loader:'url-loader?limit=1000&name=resource/[name].[ext]'},
				{test: /\.string$/,loader: 'html-loader'},
		     ]
     },
     resolve : {
     	// 目录别名
     	alias : {
     		// utilDir 		: 	path.resolve(__dirname,'src/util'),
     		node_modules_dir : __dirname + '/node_modules',
     		utilDir 	: __dirname + '/src/util',
     		pageDir 	: __dirname + '/src/page',
     		serviceDir	: __dirname + '/src/service',
     		imageDir	: __dirname + '/src/image'
     	}
     },
     plugins: [
     	// 独立通用模块到js/base.js
        new  webpack.optimize.CommonsChunkPlugin({
        	name: 'common',
        	filename: 'js/base.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        // html模版的处理
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list','商品列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情页')),
        new HtmlWebpackPlugin(getHtmlConfig('cart','购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','更新个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','查看个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改用户密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果页')),
    ]
 };

 module.exports = config;

// 判断如果环境变量为dev,则加上该client方便开发
if ('dev' === WEBPACK_ENV) {
	config.entry.common.push('webpack-dev-server/client?http://localhost:8100/');
}