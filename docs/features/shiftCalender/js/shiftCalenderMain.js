document.addEventListener("DOMContentLoaded", function () {

  var today = new Date();
  var currentMonth = today.getMonth();
  var currentYear = today.getFullYear();

  var selectYear = 0;
  var selectMonth = 0;
  var selectDay = 0;

  var createYear = generate_year_range(1970, 2200);

  var calendar = document.getElementById("calendar");
  var lang = calendar.getAttribute('data-lang');

  var months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
  var days = ["日", "月", "火", "水", "木", "金", "土"];

  var dayHeader = "<tr>";

  for (var day in days) {
    dayHeader += "<th data-days='" + days[day] + "'>" + days[day] + "</th>";
  }
  dayHeader += "</tr>";

  document.getElementById("thead-month").innerHTML = dayHeader;

  var monthAndYear = document.getElementById("monthAndYear");

 function init() {
    showCalendar(currentMonth, currentYear);
  }
  setTimeout(init, 100);

  function generate_year_range(start, end) {
    var years = "";
    for (var year = start; year <= end; year++) {
      years += "<option value='" + year + "'>" + year + "</option>";
    }
    return years;
  }

  document.getElementById("next").onclick = function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;

    showCalendar(currentMonth, currentYear);
  }

  document.getElementById("previous").onclick = function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;

    showCalendar(currentMonth, currentYear);
  }

  function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);

    showCalendar(currentMonth, currentYear);
  }

  function showCalendar(month, year) {
    var firstDay = (new Date(year, month)).getDay();
    var tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";

    selectMonth = month;
    selectYear = year;


    const shiftRepository = new ShiftRepository();

    const shiftMonthAll = shiftRepository.getShiftMonthAll(selectYear, selectMonth);
    console.log(shiftMonthAll);
    const workall = document.getElementById("shiftMonthAll");
    let sumTime = 0;
    shiftMonthAll.forEach(function(element){
      console.log(element);
      sumTime += element.time;
    });
    

    workall.textContent = sumTime;

    monthAndYear.innerHTML = year + "年" + months[month];

    var date = 1;
    for (var i = 0; i < 6; i++) {
      var row = document.createElement("tr");

      for (var j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          cell = document.createElement("td");
          cellText = document.createTextNode("");
          cell.appendChild(cellText);
          row.appendChild(cell);
        } else if (date > daysInMonth(month, year)) {
          break;
        } else {
          cell = document.createElement("td");
          cell.setAttribute("data-day", date);
          cell.setAttribute("data-month", month + 1);
          cell.setAttribute("data-year", year);
          cell.setAttribute("data-month_name", months[month]);
          cell.className = "date-picker";
          cell.innerHTML = "<span>" + date + "</span>";

          // TODO: ShiftRepositoryをインスタンス化する
          const shiftRepository = new ShiftRepository();

          //　TODO:  DBから年、月、日を用いてデータを取得する
          // DB_READMEのShiftDBの中の#### 取得を参考にやってみよう
          // 年と月はselectYear,selectMonthが参考になるよ
          // Dayはこのfor文をよく読むとどこにかいてあるかわかるかも
          const shiftDayAll = shiftRepository.getShiftDayAll(selectYear, selectMonth, date);
          
          // Next: エラー処理
          //複数のシフトを登録してしまった場合複数個のでーたが取られてしまう場合があります。その時にどうするか考えてみましょう。
          
          // TODO: 表示させる　 shiftData[date - 1].time を取得したものに変えよう
          if(shiftDayAll.length > 0){
            cell.innerHTML += "<p>" + shiftDayAll[0].time + "h" + "</p>";
          }

          if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
            cell.className = "date-picker selected";
          }

          // 新しいコード: カレンダーの日付をクリックしたときの処理を追加
          cell.addEventListener("click", function () {
            showNumberInputModal(this);
          });

          row.appendChild(cell);
          date++;
        }
      }

      tbl.appendChild(row);
    }
  }

  function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  }

  // 新しいコード: モーダル表示関連の処理
  function showNumberInputModal(cell) {
    var numberInputModal = document.getElementById("numberInputModal");
    numberInputModal.style.display = "block";

    // Pass the cell information to the modal
    var day = cell.getAttribute("data-day");
    var month = cell.getAttribute("data-month");
    var year = cell.getAttribute("data-year");
    var date = new Date(year, month - 1, day);

    var modalDateDisplay = document.getElementById("modalDateDisplay");
    modalDateDisplay.textContent = formatDate(date);

    numberInputModal.dataset.date = date;
    numberInputModal.dataset.month = month;
    numberInputModal.dataset.year = year;

    selectDay = day;

    // 新しいコード: モーダル内の表示をクリア
    document.getElementById("numberInput").value = "";
    document.getElementById("numbersDisplay").innerHTML = "";
  }

  function formatDate(date) {
    var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('ja-JP', options);
  }

  // シフト時間の入力
  document.getElementById("workInput").onclick = function () {
    const workAmount = parseInt(document.getElementById("numberInput").value);
    const shiftRepository = new ShiftRepository();

    const shift = {
      id: 0,
      // Idは自動で更新されるのでここでは初期値の0
      date: new Date(selectYear, selectMonth, selectDay),
      time: workAmount,
    };

    const shiftList = shiftRepository.setShift(shift);
    
    //更新
    setTimeout(function () {
      location.reload();
  },);


  





  }


});
