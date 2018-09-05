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
    mode: 'development',
    // バンドルの起点となるファイルを指定します
    entry: './src/index.js',
    // バンドルファイル出力設定を行います
    output: {
        path: `${__dirname}/dist`, // 出力先
        filename: 'main.js' // バンドルファイル名
    }
}
