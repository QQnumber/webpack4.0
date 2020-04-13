
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

// plugin
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// constant
const { PATHS, RESOLVE_EXTENTSIONS } = require('./constant.js');
// 注入到html的loading样式
const loading = {
    html: fs.readFileSync(path.join(__dirname, './loading/index.html')),
    css: `<style type="text/css">${fs.readFileSync(path.join(__dirname, './loading/index.less'))}</style>`
};

module.exports = {
    entry: './src/main.js',
    output: {
        path: PATHS.appBuild,
        filename: 'main.js'
    },
    resolve: {
        // 解析第三方包
        modules: [PATHS.appNodeModules, 'node_modules'],
        // 依次寻找解析
        extensions: RESOLVE_EXTENTSIONS,
        // 别名
        alias: {
            '@': PATHS.appSrc
        }
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [PATHS.appBuild]
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: "index.html",
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            loading
        }),
        // 设置全局变量 并非在window 下
        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // }),
        new CopyWebpackPlugin([
            {
                from: 'public',
                to: 'public/'
            }
        ]),
    ]
}

