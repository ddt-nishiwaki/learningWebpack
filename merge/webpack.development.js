/**
 * 分割した設定ファイルをマージするパッケージを導入します
 */
const merge = require('webpack-merge');

/**
 * マージする設定ファイルをインポートします
 */
const base = require('./webpack.base.js');

/**
 * Webpack development 設定
 */
module.exports = merge(base, {
    // 開発モードに設定
    mode: 'development',
    // entry: ref -> webpack.base.js
    // output: ref -> webpack.base.js
    // 開発用サーバのコンテンツベース設定
    devServer: {
        contentBase: './dist'
    },
    // ソースマップの詳細度設定
    devtool: 'eval-source-map',
});