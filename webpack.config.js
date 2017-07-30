const path = require('path'); // 导入路径包
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');


var extractCSS = new ExtractTextPlugin('css/[name].css');
var cssLoader = extractCSS.extract(['css-loader', 'postcss-loader']);
var sassLoader = extractCSS.extract(['css-loader', 'postcss-loader', 'sass-loader']);
var lessLoader = extractCSS.extract(['css-loader','postcss-loader', 'less-loader']);

var pageArr = [
	''
];

module.exports = {
	//入口文件
	entry: {
		base: './src/js/base.js',
		menu: './src/js/menu.js',
		msg: './src/js/msg.js',
		user: './src/js/user.js'
	},
	//输出文件
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].js', //[name]-[chunkhash].js
        publicPath: '/demo_webpack/dist/'
	},
	//使用loader模块
	module: {
		loaders: [/*{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},*/
            {test: /\.css$/, loader: cssLoader},
            {test: /\.scss$/, loader: sassLoader},
            {test: /\.less$/, loader: lessLoader},
			{
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
				query: {
                	name: 'img/[name].[ext]',
					limit: 10*1024 //小于10k的会默认用b64实现
				}
            },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {
            	// html-loader,专门替换html里的资源-比如替换图片资源，否则需要require
				test: /\.html$/,
				use: [{
					loader: 'html-loader',
					options: {
						minimize: false,
						attrs: ['img:src', 'link:href']
					}
				}]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'pages/test_all.html',
			template: './src/pages/test_all.html',
			inject: 'body',
			chunks: ['base']
		}),
		new HtmlWebpackPlugin({
			filename: 'pages/menu.html',
			template: './src/pages/menu.html',
			inject: 'body',
			chunks: ['menu']
		}),
		new HtmlWebpackPlugin({
			filename: 'pages/msg.html',
			template: './src/pages/msg.html',
			inject: 'body',
			chunks: ['msg']
		}),	new HtmlWebpackPlugin({
			filename: 'pages/user.html',
			template: './src/pages/user.html',
			inject: 'body',
			chunks: ['user']
		}),
		//这样会定义，所有js文件中通过require引入的css都会被打包成相应文件名字的css
        extractCSS //[name]-[chunkhash].css
	]
};