/*
* @Author: mxm
* @Date:   2017-12-06 21:18:51
* @Last Modified by:   mxm
* @Last Modified time: 2017-12-09 17:54:36
*/

 var webpack 			= require('webpack');
 var ExtractTextPlugin 	= require("extract-text-webpack-plugin");
 var HtmlWebpackPlugin 	= require('html-webpack-plugin');

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

 module.exports = {
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
