// 静的インポートを行う
import jQuery from 'jquery';
// 動的インポートを行う
import('react').then(function(){
    console.log('react load complete!')
});
// main.jsでは静的に, sub.jsでは動的にインポートを行う
import lodash from 'lodash';

const $ = jQuery;
console.log($.fn.jquery);