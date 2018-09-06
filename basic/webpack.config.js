/*
 * webpackの設定
 * 
 * このファイルがあるディレクトリでwebpackコマンドを実行すると、下記の設定でバンドルを行います。
 * 
 *      webpack
 * 
 * webpackをローカルインストールしている場合は下記コマンドを実行してください。
 * 
 *      npx webpack
 * 
 * NOTE:
 * webpack コマンドは webpack --config webpack.config.js と同等です。
 * 設定ファイルの名称を変える必要がある場合は明示的に --config オプションを指定してください。
 *
 *
 * 基本的な設定項目
 *
 *      mode: バンドルの最適化設定を指定
 *      entry: エントリーポイントを指定
 *      output: 出力設定
 *          path: 出力先ディレクトリを指定
 *          filename: 出力ファイル名を指定
 *
 *
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    /*
     * modeオプションは v4.x~から追加されました。
     * 指定しないと警告が出ます。
     * modeオプションに設定した値は process.env.NODE_ENV で参照することが可能です。
     * 指定できるオプションと意味は次の通りです。
     * ※詳細はhttps://webpack.js.org/
     *
     * 'development'
     *      エラー表示、デバッグしやすいファイルの出力、再ビルド時間の短縮（キャッシュ有効）などの設定が有効になります。
     * 'production'
     *      ファイルの圧縮や、モジュールの最適化などの設定が有効になります
     * 'none'
     *      デフォルトの最適化オプションを無効にします。
     */
    mode: 'development',
    // バンドルの起点となるファイルを指定します
    entry: './src/index.js',
    // バンドルファイル出力設定を行います
    output: {
        path: `${__dirname}/dist`, // 出力先
        filename: 'main.js' // バンドルファイル名
    },
    /**
     * webpack-dev-serverの設定です
     * サーバーなのでコンテンツの規定パスの設定が必要となります。
     * open オプションを指定することで設定したディレクトリの index.html をブラウザで開くようになります。
     * 
     *      webpack-dev-server --open
     * 
     * サーバーを起動するとソースコードを監視して
     * 変更があれば自動で再ビルドし、ブラウザをリロードします。
     * コマンドは package.json にショートカットを設定します
     */
    devServer: {
        contentBase: './dist'
    },
    /*
     * ソースマップの利用は mode オプションの切り替えで可能ですが、
     * エラー出力の精度を上げるといったカスタマイズも可能です。
     * 設定には devtool オプションを設定します。
     * 設定値は次の通りです。
     * 規定値は eval ですが、開発環境用にはもっともオリジナルのソースを得られる eval-source-map の利用が望ましいでしょう
     * 
     *   本番環境利用向け
     *      'none'
     *          バンドル後のファイルを参照
     *      'source-map'
     *          オリジナルのコードを再現し参照
     *      'hidden-source-map'
     *          オリジナルのコードを再現し参照
     *      'nosources-source-map'
     *          ソースはマップに含まれない
     *   開発環境利用向け
     *      'eval'
     *          モジュール単位に分離されたコードを参照
     *      'eval-source-map'
     *          モジュール単位に分離されたコードを参照
     *          オリジナルのコードを再現し参照
     *      'cheap-source-map'
     *          モジュール単位に分離されたコードを参照
     *          ローダーで変換された結果を参照
     *      'inline-source-map
     *          オリジナルのコードを再現し参照
     *      'cheap-eval-source-map'
     *          ローダーで変換された結果を参照
     *          行単位のマッピング
     *      'cheap-module-eval-source-map'
     *          オリジナルのコードを再現し参照
     *          行単位のマッピング
     *      'cheap-module-source-map'
     *          オリジナルのコードを再現し参照
     *          行単位のマッピング
     *      'inline-cheap-source-map'
     *          ローダーで変換された結果を参照
     *          行単位のマッピング
     *      'inline-cheap-module-source-map'
     *          オリジナルのコードを再現し参照
     *          行単位のマッピング
     */
    // TODO: ソースマップのコードで日本語が文字化けを起こすので対応方法を検討する
    // 参考サイト: https://qiita.com/kenfdev/items/0ed70a1692bd2f119b69
    // 参考サイト: https://github.com/webpack/webpack/issues/1035
    devtool: 'eval-source-map',
    /**
     * プラグイン登録
     */
    plugins: [
        /**
         * CSSは通常linkタグから読み込んで使うものなので
         * それを実現するプラグインを導入する
         */
        // webpack4 以降に対応していないので, ISSUEの回答にある mini-css-extract-pluginを代わりに登録する
        // new ExtractTextPlugin.extract({use: 'css-loader'})
        new MiniCssExtractPlugin({
            filename: "main.css"
        })
    ],
    /**
     * ローダーを有効にするには module > rules オプションを設定します。
     */
    module: {
        rules: [
            {
                test: /\.css$/, // 拡張子が .css のファイルを対象にします
                use: [ // マッチしたファイルに対して使用するローダーを設定します
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    /**
                     * 設定したローダーは"下から順に処理されます。
                     * この場合は css-loader → style-loader の順になります。
                     * 
                     * style-loader の箇所は プロジェクトによって使用するローダーを変えます。
                     * 詳細はGitHub参照 https://github.com/webpack-contrib/css-loader
                     */
                    // style-loaderはstyleタグを直接埋め込むものなので今回は設定から除外する
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                /**
                 * 画像をDataUrl形式でバンドルするローダーです。
                 * limitオプションはバイト数を指定し、これより小さいサイズの画像を対象とします。
                 * 用途としてはアイコンなどの小さいファイルをいちいち画像ファイルとして読み込まずにバンドルしてしまうイメージです。
                 */
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 500000,
                            /**
                             * [...]はプレイスフォルダです
                             * [path] リソースへのパスが埋め込まれます
                             * [name] 元ファイルのベース名が埋め込まれます
                             * [ext] 元ファイルの拡張子
                             * [hash] データに応じたハッシュ値
                             */
                            name: './images/[name].[ext]?[hash]'
                        }
                    }
                ]
            }
        ]
    }

}
