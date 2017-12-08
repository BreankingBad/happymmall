/*
* @Author: mxm
* @Date:   2017-12-06 21:18:51
* @Last Modified by:   mxm
* @Last Modified time: 2017-12-09 00:03:15
*/

 var webpack 			= require('webpack');
 var ExtractTextPlugin 	= require("extract-text-webpack-plugin");
 var HtmlWebpackPlugin 	= require('html-webpack-plugin');

 const path = require('path');

 module.exports = {
     entry: {
     	'common' : ['./src/page/common/index.js'],
     	'index' : ['./src/page/index/index.js'],
     	'login' : ['./src/page/login/index.js'],
 	 },
     output: {
         path: path.resolve(__dirname, 'dist'),
         filename: 'js/[name].js'
     },
     externals: {
     	'jquery' : 'window.jQuery'
     },
     module: {
		loaders: [
				{
				     test: /\.css$/,
				     loader:  ExtractTextPlugin.extract("style-loader","css-loader")
				 }
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
        new HtmlWebpackPlugin({
        	template : './src/view/index.html',
        	filename : 'view/index.html',
        	inject   : true,
        	hash 	 : true,
        	chunks 	 : ['common', 'index']
        }),
    ]
 };
