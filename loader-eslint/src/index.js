/**
 * 構文チェックツールでチェックさせたい
 * 悪い例を設定する
 */
// varの利用は控えるべき
var name = 'webpack';
console.log(`こんにちは、${name}!`);
// 曖昧な比較は控えるべき
console.log(0b11 == 3);
