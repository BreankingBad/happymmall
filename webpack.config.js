/*
* @Author: mxm
* @Date:   2017-12-06 21:18:51
* @Last Modified by:   mxm
* @Last Modified time: 2017-12-08 23:23:09
*/

 var webpack = require('webpack');
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
     plugins: [
        new  webpack.optimize.CommonsChunkPlugin({
        	name: 'common',
        	filename: 'js/base.js'
        })
    ]
 };
