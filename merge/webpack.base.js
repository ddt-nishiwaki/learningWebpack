/**
 * Webpack dev/prod 共通設定
 * 
 * webpack-merge パッケージの導入により
 * 下記設定をマージすることができます
 * 構文は次の通りです。
 * 
 *     const merge = require('webpack-merge');
 *     merge(webpackの設定データ, webpackの設定データ);
 * 
 */
module.exports = {
    entry: './src/index.js',
    output: {
        path: `${__dirname}/dist`,
        filename: 'bundle.js'
    }
}