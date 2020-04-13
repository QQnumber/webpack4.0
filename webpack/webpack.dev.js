const { smart } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.js')

// constant
const { PATHS } = require('./constant.js');

module.exports = smart(webpackBaseConfig, {
    mode: "development",
    devServer:{
        hot: true,                  //开启模块热替换
        contentBase: PATHS.appBuild,     //将dist目录下的文件，作为额外可访问文件
        port: 3000,                //DevServer 服务监听的端口，默认8080
        https: false,              //是否使用HTTPS服务
        open: false                //自动打开网页
    },
    devtool: 'inline-source-map',
    // 定义的模块由cdn引入(在模板html头部引入)，无需打包
    // externals: {
    //     jquery: "$"
    // },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                include: [PATHS.appSrc],
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.css$/, 
                include: [PATHS.appSrc],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1
                        }
                    },
                    "postcss-loader",
                ]
            },
            {
                test: /\.css$/,
                include: [PATHS.appNodeModules],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                include: [PATHS.appSrc],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                include: [PATHS.appNodeModules],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.scss$/, 
                include: [PATHS.appSrc],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                include: [PATHS.appNodeModules],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                include: [PATHS.appSrc],
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 30 * 1024,
                        outputPath: 'images/',
                        fallback: 'file-loader',
                        publicPath: ""
                    }
                }
            },
            {
                test: /\.(eot|ttf|woff|svg)$/,
                include: [PATHS.appSrc],
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 30,         //30KB 以下的文件采用 url-loader
                        fallback: 'file-loader',  //否则采用 file-loader，默认值就是 file-loader
                        outputPath: 'fonts',      //图片输出路径
                    }
                }]
            },
        ]
    }
})
