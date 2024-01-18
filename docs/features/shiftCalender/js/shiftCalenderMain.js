class ShiftMain {
    getShift(){
        const shiftRepository = new ShiftRepository();
        const shift = shiftRepository.getShiftList();
        console.log(shift);
    };

    setShift(){
        const shiftRepository = new ShiftRepository();

        const shift = {
            id: 0,
            // 来月に変更する
            date: new Date(2021, 3, 1),
            time: 3,
        };

        const shiftList = shiftRepository.setShift(shift);
        console.log(shiftList);
    }

    getShiftMonthAll(){
        const shiftRepository = new ShiftRepository();
        const shiftMonthAll = shiftRepository.getShiftMonthAll(2021, 3);
        console.log(shiftMonthAll);
    }
}