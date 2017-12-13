var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
	//不写./会去node_modules里面找
	entry:[
		//不直接写入口文件 "./app/index.js" ./可以用__dirname代替
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		'react-hot-loader/patch',
		path.join(__dirname,"app/index.js")
	],
	output:{
		path:path.join(__dirname,'/dist/'),
		filename:'[name].js',
		publicPath:'/'
	},
	//插件配置
	plugins:[
		new HtmlWebpackPlugin({
			template:'./index.tpl.html',
			inject:'body',
			filename:'./index.html'
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(), //启动全局HMR
		new webpack.NoErrorsPlugin(), //不提示错误
		new webpack.DefinePlugin({
			'process.env.NODE_ENV':JSON.stringify('developement')
		})
	],
	//模块配置
	module:{
		loaders:[
			{
				//匹配
				test:/\.js$/,
				//不匹配node_modules中的.js
				exclude:/node_modules/,
				loader:'babel-loader',
				query:{
					presets:['react','es2015']
				}
			},
			{
				test:/\.css$/,
				loader:'style!css'
			},{
				test:/\.less$/,
				loader:'style-loader!css-loader!less-loader'
			}
		]
	}
}
