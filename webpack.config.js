/*
* @Author: mxm
* @Date:   2017-12-06 21:18:51
* @Last Modified by:   mxm
* @Last Modified time: 2017-12-09 18:29:29
*/

 var webpack 			= require('webpack');
 var ExtractTextPlugin 	= require("extract-text-webpack-plugin");
 var HtmlWebpackPlugin 	= require('html-webpack-plugin');

var WEBPACK_ENV			= process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

// 获取html-webpack-plugin参数的方法
var getHtmlConfig 		= function(name){
	return {
        	template : './src/view/'+ name + '.html',
        	filename : 'view/'+ name + '.html',
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
     	'login' : ['./src/page/login/index.js'],
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
				{test:/\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,loader:'url-loader?limit=1000&name=resource/[name].[ext]'}
		     ]
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
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]
 };

 module.exports = config;

// 判断如果环境变量为dev,则加上该client方便开发
if ('dev' === WEBPACK_ENV) {
	config.entry.common.push('webpack-dev-server/client?http://localhost:8100/');
}