// 静的インポートを行う
import jQuery from 'jquery';

const $ = jQuery;
/*
 * 圧縮オプションでconsole.logを削除する設定にしたので
 * 確認のために記載します
 * 
 * webpackの設定で
 * mode: 'production' を指定すると
 * ログが出なくなることを確認します
 */
console.log($.fn.jquery);