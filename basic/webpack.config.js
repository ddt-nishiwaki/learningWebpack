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
    mode: 'production',
    // バンドルの起点となるファイルを指定します
    entry: './src/index.js',
    // バンドルファイル出力設定を行います
    output: {
        path: `${__dirname}/dist`, // 出力先
        filename: 'prod_main.js' // バンドルファイル名
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
    }

}
