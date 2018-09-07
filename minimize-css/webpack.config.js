/**
 * CSSファイルを生成するたのプラグインを導入します
 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * CSS圧縮を行うためのプラグインを導入します
 * 
 * NOTE:
 * optimization－minimizerパラメーターを指定した場合、
 * （本来のOptimizeCSSAssetsPluginだけでなく）UglifyJsPluginも合わせて指定してください。
 * さもないと、既定の構成が上書きされてしまい、JavaScriptコードが正しく圧縮されなくなってしまいます。
 */
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


////////////////////////////////////////////
// Webpack Settings
////////////////////////////////////////////
module.exports = {
    /*
     * 圧縮設定を行うプラグインを検証するため
     * 本番用モードに切り替えます
     * これによりコード圧縮が有効になります
     */
    mode: 'production',
    // バンドルの起点となるファイルを設定する
    entry: './src/index.js',
    // 出力に関する設定
    output: {
        // 出力先ディレクトリを設定する
        path: `${__dirname}/dist`,
        // バンドルしたファイルの名前を設定する
        filename: 'bundle.js'
    },
    // webpack-dev-serverのコンテンツルートを設定する
    devServer: {
        contentBase: './dist'
    },
    // ソースマップの詳細度を設定する
    devtool: 'eval-source-map',
    plugins: [
        /**
         * cssファイル書き出しプラグインの設定を行います
         */
        new MiniCssExtractPlugin({
            filename: "bundle.css",
            chunkFilename: "[id].css"
        }),
        /**
         * cssファイル圧縮プラグインの設定を行います
         */
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
          })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin(),
            new OptimizeCssAssetsPlugin({})
        ]
    },
    // ローダー設定
    module: {
        rules: [
            /**
             * CSSファイルを生成するたのプラグインの設定を行います
             */
            {
                test: /\.css$/,
                use: [
                    // 1. CSSファイルをモジュール化し
                    // 2. CSSファイルとしてバンドルする処理を行う
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader"
                ]
            },
        ]
    },
}