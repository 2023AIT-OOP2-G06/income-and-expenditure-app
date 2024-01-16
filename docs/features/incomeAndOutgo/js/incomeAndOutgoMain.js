// 収入管理ページ用のカスタムJavaScript

//----ー扶養欄の働いた金額----ー
var fuyo_worked = 600000;
// HTMLに計算結果を挿入
document.getElementById('fuyo_work_value').innerHTML = '働いた金額 : ' + fuyo_worked.toLocaleString() + '円';

//----ー扶養欄の残り金額----ー
var fuyo_value = 1030000;
var fuyo_rest=fuyo_value - fuyo_worked;
// HTMLに計算結果を挿入
document.getElementById('fuyo_rest_value').innerHTML = '残った金額 : ' + fuyo_rest.toLocaleString() + '円';


//----ー収入欄の働いた金額----ー
var in_worked = 60000;
// HTMLに計算結果を挿入
document.getElementById('in_work_value').innerHTML = '働いた金額 : ' + in_worked.toLocaleString() + '円';

//----ー収入欄の勤務時間----ー
var in_time = 60;
// HTMLに計算結果を挿入
document.getElementById('in_work_time').innerHTML = '勤務時間 : ' + in_time + '時間';


//----ー支出欄----ー
var out_value1 = 60000;
var out_value2 = 10000;
var total_out = out_value1 + out_value2;
// HTMLに計算結果を挿入
document.getElementById('out_value').innerHTML = '支出の合計 : ' + total_out.toLocaleString() + '円';


//----ー収支欄----ー
var total_bop = in_worked - total_out;
// HTMLに計算結果を挿入
document.getElementById('bop_value').innerHTML = '収支の合計 : ' + total_bop.toLocaleString() + '円';



//ー----グラフのパーセンテージ----ー
var percentage = (fuyo_rest / fuyo_value)*100; // 例として100とします
// CSS変数に値をセット
document.documentElement.style.setProperty('--my-calculated-value', percentage + '%');



