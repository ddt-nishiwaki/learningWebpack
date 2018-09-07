/*
 * 複数エントリーポイントでのバンドル最適化をわかりやすくするために
 * 可視化を行うツールを導入する
 */ 
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/*
 * 今まで手作業で作っていたdist/index.htmlですが
 * これを自動化するプラグインがあるため導入します
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 開発用モードでバンドルします
    mode: 'development',
    /**
     * エントリーポイントを複数設定する場合
     * id: ファイルパス の形式で設定します
     * id となるキーはなんでもいいですが、わかりすい名前をつけるべきです
     */
    entry: {
        main: './src/main.js',
        sub: './src/sub.js'
    },
    // 出力先設定
    output: {
        // 出力先ディレクトリを指定します
        path: `${__dirname}/dist`,
        /**
         * 今回、エントリーポイントが複数あるので
         * 決め打ちではなく各エントリーポイントに応じた名前になるように
         * プレースホルダーを設定します
         * 
         *  [name] エントリーポイントのファイル名
         *  [chunkhash] ファイル毎のハッシュ値
         * 
         */
        filename: '[name]-[chunkhash].js',
    },
    devServer: {
        contentBase: './dist'
    },
    /**
     * 今回複数のエントリーポイントが同様のライブラリを参照しているので
     * 共通のライブラリとして切り離す設定を行います
     */
    optimization: {
        splitChunks: {
            // 共通ファイルのバンドル(チャンク)ファイル名
            name: 'commonlib',
            /**
             * 最適化の対象となるチャンクを示します。
             * つまり重複しているモジュールをチャンクとして切り出す対象を示します。
             * モジュールのインポートには静的インポートと動的インポートがあるため
             * それらをどう扱うかを設定するということです。
             * 設定できる値は次の通りです。
             * 
             * 'initial' 静的インポートされているモジュールを最適化します。動的インポートは対象外です。
             * 'async' 動的インポートされているモジュールを最適化します。静的インポートは対象外です。
             * 'all' モジュール全てを対象に最適化を行います。
             * 
             * 今回は2つのエントリーポイントでインポートしているモジュールが重複していますが
             * 動的、静的の面で差分があります。
             * 
             *  |        | main.js        | sub.js         |
             *  | jQuery | static import  | static import  | initial で最適化
             *  | react  | dynamic import | dynamic import | async で最適化
             *  | lodash | static import  | dynamic import |
             * 
             */
             // chunks: 'initial',
             //    対象は jQuery と main.jsのlodash になります
             // chunks: 'async',
             //    対象は react と sub.jsのlodash になります
             chunks: 'all',
             //    全てのモジュールが対象となります
             /*
              * それぞれの設定によって書き出されるファイルとサイズの結果を記載します。
              * 下記結果は npm run build コマンドで可視化されたものをブラウザで表示するように設定していますので
              * 合わせて参照ください。
              * 
              *     initial
              *     -----------------------------------------------------------------------------
              *             0-099cd3da8304c176a666.js  63.8 KiB          0  [emitted]
              *     commonlib-211095a39483b50a0f8f.js   848 KiB  commonlib  [emitted]  commonlib
              *         main-fe04a9d4bdcd40fb99df.js  10.1 KiB       main  [emitted]  main
              *         sub-bce78e8d09c3ce53cffd.js  10.1 KiB        sub  [emitted]  sub
              *             1-2ba5f16d35bee64945db.js   547 KiB          1  [emitted]
              *
              *     async
              *     -----------------------------------------------------------------------------
              *     commonlib-534fd9d8373a3122d13d.js  611 KiB  commonlib  [emitted]  commonlib
              *         main-0433ba56cec8ea5229e1.js  857 KiB       main  [emitted]  main
              *         sub-d6f5a37f827bad2c4c00.js  310 KiB        sub  [emitted]  sub
              *
              *     all
              *     -----------------------------------------------------------------------------
              *     commonlib-b9c90fad5af278e67715.js   911 KiB  commonlib  [emitted]  commonlib
              *         main-d802fc6747002de014bd.js  7.71 KiB       main  [emitted]  main
              *         sub-207e829bc2c2f3545de5.js  7.64 KiB        sub  [emitted]  sub
              */
        }
    },
    plugins: [
        /*
         * バンドル結果を可視化するツールを設定します
         * => index.htmlの自動生成を確認したいため
         *    設定を解除します
         */
        // new BundleAnalyzerPlugin(),

        /*
         * dist/index.htmlの自動生成を行うプラグインの設定です
         * NOTE: 任意のプロパティに値を設定することも可能です。
         */
        new HtmlWebpackPlugin({
            title: '速習webpack',
            filename: "index.html",
            template: "src/index.html"
        })
    ]

}