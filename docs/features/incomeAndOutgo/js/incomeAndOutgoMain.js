
// 現在の年月を管理する変数
var currentYearMonth = new Date();

//----ー扶養欄の働いた金額----ー
var fuyo_worked = 600000;

//----ー扶養欄の残り金額----ー
var fuyo_value = 1030000;
var fuyo_rest = fuyo_value - fuyo_worked;

//----ー収入欄の働いた金額----ー
var in_worked = 60000;

//----ー収入欄の勤務時間----ー
var in_time = 60;

//----ー支出欄----ー
var out_value1 = 60000;
var out_value2 = 10000;
var total_out = out_value1 + out_value2;

//----ー収支欄----ー
var total_bop = in_worked - total_out;

// 年月を更新する関数
function updateCurrentDate() {
  var currentDateElement = document.getElementById('currentDate');
  var year = currentYearMonth.getFullYear();
  var month = currentYearMonth.getMonth() + 1;
  currentDateElement.textContent = year + '年' + month + '月';
}

// ボタンで月を変える関数
function changeMonth(direction) {
    if (direction === 'previous') {
    // 先月の日付に戻る
    currentYearMonth.setMonth(currentYearMonth.getMonth() - 1);
  } else if (direction === 'current') {
    // 来月の日付に進める
    currentYearMonth.setMonth(currentYearMonth.getMonth() + 1);
  }
  updateData(); // データを更新
  updateCurrentDate(); // 年月を更新
}

// データを更新する関数 (適宜実際のデータ更新処理を追加)
function updateData() {
  // 仮のデータ更新処理
  fuyo_worked = getRandomValue();
  fuyo_rest = getRandomValue();
  in_worked = getRandomValue();
  in_time = getRandomValue();
  out_value1 = getRandomValue();
  out_value2 = getRandomValue();
  total_out = out_value1 + out_value2;
  total_bop = in_worked - total_out;

  // HTMLに反映
  document.getElementById('fuyo_work_value').innerHTML =
    '働いた金額 : ' + fuyo_worked.toLocaleString() + '円';
  document.getElementById('fuyo_rest_value').innerHTML =
    '残った金額 : ' + fuyo_rest.toLocaleString() + '円';
  document.getElementById('in_work_value').innerHTML =
    '働いた金額 : ' + in_worked.toLocaleString() + '円';
  document.getElementById('in_work_time').innerHTML =
    '勤務時間 : ' + in_time + '時間';
  document.getElementById('out_value').innerHTML =
    '支出の合計 : ' + total_out.toLocaleString() + '円';
  document.getElementById('bop_value').innerHTML =
      '収支の合計 : ' + total_bop.toLocaleString() + '円';
    
    
  // グラフのパーセンテージを計算
    var percentage = (fuyo_rest / fuyo_value) * 100;
    
  // CSS変数に値をセット
    document.documentElement.style.setProperty('--my-calculated-value', percentage + '%');
}

// 乱数を生成する関数 (仮のデータ生成用)
function getRandomValue() {
  return Math.floor(Math.random() * 1000000);
}

// ページ読み込み時に初期化
window.onload = function () {
  updateCurrentDate();
  updateData(); // データを初期表示
};
