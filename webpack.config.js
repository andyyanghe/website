const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const uglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    entry: './pageTest/index.js', // 文件入口
    mode: 'development', // 开发环境
    output: {
        path: path.resolve(__dirname, 'dist'), // 输出文件目录
        filename: 'index.js' // 输出文件名
    },
    module: {
        rules: [
            {
                // 正则表达式，表示.css后缀的文件
                test: /\.css$/,
                // 针对css文件使用loader,有先后顺序，数组项越靠后越先执行(从下到上，从右到左)
                use: ['style-loader', 'css-loader']
            },
            {
                //正则表达式，表示图片文件
                test:/\.(png|jpe?g|gif|svg)$/,
                //针对图片文件使用的loader
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: "[name].[ext]",
                        // 204800B = 204.8KB
                        limit: 204800,
                        esModule: false,
                        outputPath: 'static/images',
                        publicPath: 'static/images'
                    }
                }],
                type: 'javascript/auto'
            },
            {
                test: /\.html$/,
                // use: ["html-withimg-loader"]
                use: [{
                    loader: 'html-withimg-loader',
                    options: {
                        name: "[name].[ext]",
                        // 204800B = 204.8KB
                        limit: 204800,
                        esModule: false,
                        outputPath: 'static/images',
                        publicPath: 'static/images'
                    }
                }],
            }
        ]
    },
    plugins: [
        // 打包需要的各种插件
        new htmlWebpackPlugin({
            // HTML模板路径
            template: './pageTest/index.html'
        }),
        new uglifyJSWebpackPlugin()
    ],
    devServer: {

    }
    // watch: true
}