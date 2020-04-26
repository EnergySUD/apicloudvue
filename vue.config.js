const path = require("path");

const isProduction = process.env.NODE_ENV === 'production';

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const host = "http://127.0.0.1:8001"

module.exports = {
	// 基本路径
	publicPath: './',
	// 输出文件目录
	outputDir: 'apiCloud',
	// 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
	assetsDir: "public",
	// 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
	// indexPath: 'index.html',
	// eslint-loader 是否在保存的时候检查
	lintOnSave: false,
	// webpack配置
	// see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
	chainWebpack: config => {
		config
			.entry('index')
			.add('babel-polyfill')
			.end();
		// 配置别名
		config.resolve.alias
			.set("@", path.resolve(__dirname,"src"))
			.set("@iconfont", path.resolve(__dirname,"src/assets/iconfont"));
		// 生产环境配置
		if (isProduction) {
			// 删除预加载
			config.plugins.delete('preload');
			config.plugins.delete('prefetch');
			// 压缩代码
			config.optimization.minimize(true);
			// 分割代码
			config.optimization.splitChunks({
				chunks: 'all'
			})
		}
	},
	configureWebpack: config => {
		if (isProduction) {
			// 为生产环境修改配置...
			let optimization = {
				minimizer: [new UglifyJsPlugin({
					uglifyOptions: {
						warnings: false,
						compress: {
							drop_debugger: true,
							drop_console: true,
						},
					}
				})]
			}
			Object.assign(config, {
				optimization
			})
		} else {
			// 为开发环境修改配置...
		}
	},
	// 生产环境是否生成 sourceMap 文件
	productionSourceMap: false,
	// css相关配置
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		extract: true,
		// 开启 CSS source maps?
		sourceMap: false,
		// css预设器配置项
		loaderOptions: {
			// pass options to sass-loader
			sass: {

			}
		},
		// 启用 CSS modules for all css / pre-processor files.
		requireModuleExtension: true,
	},
	// use thread-loader for babel & TS in production build
	// enabled by default if the machine has more than 1 cores
	parallel: require('os').cpus().length > 1,
	devServer: {
		port: 8888, // 端口
		open: false, // 自动开启浏览器
		compress: false, // 开启压缩
		overlay: {
			warnings: true,
			errors: true
		},
		proxy: {
			"/system/getMenuList": { target:host, changeOrigin: true, },
			"/system/buildMenus": { target:host, changeOrigin: true, },
			"/system/getMenuTree": { target:host, changeOrigin: true, },
			"/system/addMenu": { target:host, changeOrigin: true, },
			"/system/delMenu": { target:host, changeOrigin: true, },
			
			"/system/getRoleList": { target:host, changeOrigin: true, },
			"/system/addRole": { target:host, changeOrigin: true, },
			"/system/delRole": { target:host, changeOrigin: true, },
			"/system/savePower": { target:host, changeOrigin: true, },
			
		}
	},
}
