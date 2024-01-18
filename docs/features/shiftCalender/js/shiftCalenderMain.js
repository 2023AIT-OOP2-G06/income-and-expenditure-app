class ShiftMain {
    getShift(){
        const ShiftRepository = new ShiftRepository();
        const Shift = ShiftRepository.getShiftList();
        console.log(Shift);
    };

    setShift(){
        const ShiftRepository = new ShiftRepository();

        const Shift = {
            id: 0,
            // 来月に変更する
            date: new Date(2021, 3, 1),
            moment: new Date(2021, 3, 1,12),
            time: 3,
        };

        const ShiftList = ShiftRepository.setShift(Shift);
        console.log(ShiftList);
    }

    getShiftMonthAll(){
        const ShiftRepository = new ShiftRepository();
        const ShiftMonthAll = ShiftRepository.getShiftMonthAll(2021, 1);
        console.log(ShiftMonthAll);
    }
}