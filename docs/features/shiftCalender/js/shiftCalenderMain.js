document.addEventListener("DOMContentLoaded", function () {

    var shiftData = [
        {date: 1, shift: ""},
        {date: 2, shift: ""},
        {date: 3, shift: ""},
        {date: 4, shift: ""},
        {date: 5, shift: ""},
        {date: 6, shift: ""},
        {date: 7, shift: ""},
        {date: 8, shift: ""},
        {date: 9, shift: ""},
        {date: 10, shift: ""},
        {date: 11, shift: ""},
        {date: 12, shift: ""},
        {date: 13, shift: ""},
        {date: 14, shift: ""},
        {date: 15, shift: ""},
        {date: 16, shift: ""},
        {date: 17, shift: ""},
        {date: 18, shift: ""},
        {date: 19, shift: ""},
        {date: 20, shift: ""},
        {date: 21, shift: ""},
        {date: 22, shift: ""},
        {date: 23, shift: ""},
        {date: 24, shift: ""},
        {date: 25, shift: ""},
        {date: 26, shift: ""},
        {date: 27, shift: ""},
        {date: 28, shift: ""},
        {date: 29, shift: ""},
        {date: 30, shift: ""},
        {date: 31, shift: ""},
      ];

  
    var today = new Date();
    var currentMonth = today.getMonth();
    var currentYear = today.getFullYear();
  
    var selectYear = document.getElementById("year");
    var selectMonth = document.getElementById("month");
  
    var createYear = generate_year_range(1970, 2200);
    document.getElementById("year").innerHTML = createYear;
  
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
    showCalendar(currentMonth, currentYear);
  
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
      showCalendar(currentMonth, currentYear);
    }
  
    function previous() {
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
  
      monthAndYear.innerHTML = year + "年" + months[month];
      selectYear.value = year;
      selectMonth.value = month;
  
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
            cell.setAttribute("data-date", date);
            cell.setAttribute("data-month", month + 1);
            cell.setAttribute("data-year", year);
            cell.setAttribute("data-month_name", months[month]);
            cell.className = "date-picker";
            cell.innerHTML = "<span>" + date + "</span>";
            cell.innerHTML += "<p>" + shiftData[date-1].shift + "h"+ "</p>";
  
            if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
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
      var date = cell.getAttribute("data-date");
      var month = cell.getAttribute("data-month");
      var year = cell.getAttribute("data-year");
      var day = new Date(year, month - 1, date);
      
      var modalDateDisplay = document.getElementById("modalDateDisplay");
      console.log(day)
      console.log(formatDate(day));
      console.log(typeof(formatDate(day)))
      modalDateDisplay.textContent = formatDate(day);
  
      numberInputModal.dataset.date = date;
      numberInputModal.dataset.month = month;
      numberInputModal.dataset.year = year;
  
      // 新しいコード: モーダル内の表示をクリア
      document.getElementById("numberInput").value = "";
      document.getElementById("numbersDisplay").innerHTML = "";
    }
  
    function formatDate(date) {
      var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      return date.toLocaleDateString('ja-JP', options);
    }
  });
  