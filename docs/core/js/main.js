//** @type {ScreenList} */
function screenChange(
    screen
) {
    document.getElementById('screen_iframe_id').contentWindow.location.replace(screen);
}


const ScreenList = Object.freeze({
    balanceObPayment: './features/incomeAndOutgo/incomeAndOutgoScreen.html',
    outgo: './features/outgo/outgoScreen.html',
    jobSetting: './features/jobSetting/jobSettingScreen.html',
    shiftCalender: './features/shiftCalender/shiftCalenderScreen.html',
})