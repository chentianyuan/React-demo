var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')

new WebpackDevServer(webpack(config),{
	//publicPath设置存放和检索静态文件的位置
	publicPath:config.output.publicePath,
	hot:true,
	historyApiFallback:true,
	quiet:false,
	noInfo:false,
	stats:{
		assets:false,
		colors:false,
		version:false,
		hash:false,
		timings:false,
		chunks:false,
		chunkModules:false
	}
}).listen(3000,'localhost',function(err){
	if(err){
		console.log(err)
	}
	
	console.log('Listening at localhost:3000')
})
