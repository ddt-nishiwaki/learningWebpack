/*
 * webpackの設定
 */
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: `${__dirname}/dist`,
        filename: 'main.js'
    },
    devServer: {
        contentBase: './dist'
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // 3 htmlにインラインで挿入します
                    'css-loader', // 2 次にトランスパイルされたcssをモジュール化します
                    'sass-loader', // 1 はじめにsassをトランスパイルします
                ]
            }
        ]
    }
}
