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
    const shiftRepository = new ShiftRepository();
    const shiftMonthAll = shiftRepository.getShiftMonthAll(currentYear, currentMonth);
    console.log(shiftMonthAll);

    showCalendar(currentMonth, currentYear, shiftMonthAll);
  }
  setTimeout(init, 100);

  function generate_year_range(start, end) {
    var years = "";
    for (var year = start; year <= end; year++) {
      years += "<option value='" + year + "'>" + year + "</option>";
    }
    return years;
  }

  function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;

    const shiftRepository = new ShiftRepository();
    const shiftMonthAll = shiftRepository.getShiftMonthAll(currentYear, currentMonth);

    showCalendar(currentMonth, currentYear, shiftMonthAll);
  }

  function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;

    const shiftRepository = new ShiftRepository();
    const shiftMonthAll = shiftRepository.getShiftMonthAll(currentYear, currentMonth);
    console.log(shiftMonthAll);

    showCalendar(currentMonth, currentYear, shiftMonthAll);
  }

  function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);

    const shiftRepository = new ShiftRepository();
    const shiftMonthAll = shiftRepository.getShiftMonthAll(currentYear, currentMonth);

    showCalendar(currentMonth, currentYear, shiftMonthAll);
  }

  function showCalendar(month, year, shiftData) {
    var firstDay = (new Date(year, month)).getDay();
    var tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";

    selectMonth = month;
    selectYear = year;

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
          if (shiftData.length > 0) {
            console.log(shiftData[date - 1])
            cell.innerHTML += "<p>" + shiftData[date - 1].time + "h" + "</p>";
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

    console.log(document.getElementById("numberInput").value);
    console.log(shiftList);



  }
});
