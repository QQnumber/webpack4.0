const { smart } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base')

// plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css 代码压缩

// constant
const { PATHS } = require('./constant.js');

module.exports = smart(webpackBaseConfig, {
    mode: "production",
    plugins: [
        new MiniCssExtractPlugin({
            filename: "main.css"
        }),
    ],
    optimization: {
        minimizer: [
            // UglifyjsPlugin 只能压缩经过babel 处理过的代码，无法压缩es6
            // new UglifyjsPlugin({
            //     cache: true,    // 缓存
            //     parallel: true,  // 多线程压缩
            //     sourceMap: true
            // }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
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
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
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