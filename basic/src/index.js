/*
 * エントリーポイントとなるファイルです。
 * webpack.config.jsを参照してください。
 * 
 * 
 * import文について
 * 
 * exportされたメンバを指定してインポートする構文
 * 
 *      import { メンバ名, ... } from 'ファイルパス';
 * 
 * モジュール全体をまとめてインポートする場合の構文
 * 
 *      import * as モジュールの別名 from 'ファイルパス';
 * 
 * モジュールのメンバに別名をつけることも可能
 * 
 *      import { メンバ名 as 別名, ... } from 'ファイルパス';
 * 
 * モジュール配下のメンバが一つだけで defaultキーワードが付与されている場合の構文
 * 
 *      import モジュールの別名 from 'ファイルパス
 */
// この場合myutil.jsファイルでexportされている各メンバを指定してインポートしています。
import { APP_NAME, hello, Figure } from './myutil';

// モジュールのメンバが利用できることを確認する為ブラウザに出力します
document.write(APP_NAME);
// 公開されていないメンバへも同モジュールのメソッドからアクセス可能です
document.write(hello());