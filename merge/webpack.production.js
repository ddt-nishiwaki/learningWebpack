/**
 * 分割した設定ファイルをマージするパッケージを導入します
 */
const merge = require('webpack-merge');

/**
 * 本番の圧縮用プラグインを導入します
 */
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

/**
 * マージする設定ファイルをインポートします
 */
const base = require('./webpack.base.js');

/**
 * Webpack production 設定
 */
module.exports = merge(base, {
    // 本番モードに設定
    mode: 'production',
    // entry: ref -> webpack.base.js
    // output: ref -> webpack.base.js
    // ソースマップの詳細度設定
    devtool: 'source-map',
    // 最適化設定
    optimization: {
        // 圧縮設定
        minimizer: [
            // Javascriptの圧縮設定を行います
            new UglifyJSPlugin({
                uglifyOptions: {
                    compress: {
                        // console.logの自動消去設定
                        drop_console: true
                    }
                }
            }),
        ]
    }
});