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
// CSSファイルを .jsファイル と同じくインポートします
import './style.css';
// 画像ファイルを DataUrl としてインポートします
import animalPicture from './images/animal.jpg';
// JSONファイルのインポートは標準でサポートされています。
import data from './json/sample.json';
// csv,tsv は csv-loader を利用してインポートできます。
import csv from './csv/sample.csv';
// htmlファイルをインポートします
import html from './sample.html';
// xmlファイルをインポートします
import xml from './xml/sample.xml';

// 読み込んだXMLファイルを確認のため出力します。
console.log(JSON.stringify(xml));
// 読み込んだHTMLファイルを確認のため出力します。
console.log(html);
// 読み込んだCSVファイルを確認のため出力します
console.log(JSON.stringify(csv));
// 読み込んだJSONファイルを確認のためコンソール出力する
console.log(JSON.stringify(data));
// DOMロード完了のタイミングでインポートした画像を挿入する
window.addEventListener('DOMContentLoaded', function() {
    let img = new Image();
    img.src = animalPicture;
    document.body.appendChild(img);
});
// bodyタグにCSSを効かせるため .sky クラスを付与する
document.getElementsByTagName('body')[0].classList.add('sky');
// モジュールのメンバが利用できることを確認する為ブラウザに出力します
document.write(APP_NAME);
// 公開されていないメンバへも同モジュールのメソッドからアクセス可能です
document.write(hello());