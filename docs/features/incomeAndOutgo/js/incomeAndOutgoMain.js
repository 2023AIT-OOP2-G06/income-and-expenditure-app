
// 現在の年月を管理する変数
var currentYearMonth = new Date();

//----ー扶養欄の残り金額----ー
var fuyo_value =1030000;

const jobRepository = new JobRepository();
const job = jobRepository.getJob();
const priceValue = job.price;


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
   // updateData 関数に引数を渡す
  const year = currentYearMonth.getFullYear();
  const month = currentYearMonth.getMonth() + 1;
  const outgoRepository = new OutgoRepository();
  const outgoyear = outgoRepository.getOutgoList(year);
  const outgoMonthAll = outgoRepository.getOutgoMonthAll(year, month);
  const shiftRepository = new ShiftRepository();
  const shiftMonthAll = shiftRepository.getShiftMonthAll(year, month);

  updateData(outgoMonthAll, outgoyear,shiftMonthAll);
  updateCurrentDate(); // 年月を更新
}


// データを更新する関数 (適宜実際のデータ更新処理を追加)
function updateData(outgoMonthAll, outgoyear, shiftMonthAll) {

    outgoyear = outgoyear || [];
    shiftMonthAll = shiftMonthAll || [];

  // データ更新処理
    var fuyo_worked = outgoyear.reduce((sum, item) => sum + (item.price || 0), 0);     //扶養欄の働いた金額
    var fuyo_rest = fuyo_value - fuyo_worked;//扶養欄の残った金額
    var in_time = shiftMonthAll.reduce((sum, item) => sum + (item.time || 0), 0);  //収入欄の勤務時間
    var in_worked=0;
    if (priceValue !== null) {
        in_worked = priceValue * in_time;       //収入欄の働いた金額    
    }      
    var total_out = outgoMonthAll.reduce((sum, item) => sum + (item.price || 0), 0); //支出欄の支出の合計
    var total_bop = in_worked - total_out;   //収支欄の収支の合計

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
  updateData(); 
};
