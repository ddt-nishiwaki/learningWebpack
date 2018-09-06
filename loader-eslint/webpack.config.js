module.exports = {
    // 開発用モードでバンドルする
    mode: 'development',
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
    // ローダー設定
    module: {
        rules: [
            {// eslint-loaderの設定

                // jsの構文チェックツール対象なので .jsファイルを指定
                test: /\.js$/,
                // npmパッケージは無視する
                exclude: /node_modules/,
                use: [
                    /**
                     * ローダーの設定は"下から順"に処理されます
                     * babelと組み合わせるならまず構文チェックを行い
                     * 問題ない場合にトランスパイルするように設定します
                     */
                    {
                        loader: 'babel-loader',
                        options: {
                            options: {
                                presets: [
                                    [
                                        '@babel/preset-env',
                                        {
                                            'modules': false
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    {
                        // eslintを使用する
                        loader: 'eslint-loader',
                        /**
                         * ESLintのオプションです
                         */
                        options: {
                            // autofixモード(勝手に問題を修復)を無効にする
                            fix: false,
                            // エラー発生時にビルドを中断する
                            failOnError: true,
                        }
                    }
                ],
            }
        ]
    }
}