class ShiftApi {
    private static key: string = 'ShiftList';

    // @param {ShiftModel[]} ShiftList
    static setShiftList(
        shiftList: ShiftModel[]
    ) {
        // dateでソートする
        shiftList.sort(
            (x, y) => (new Date(x.date).getTime()) - (new Date(y.date).getTime()),
        )

        const shiftListString = JSON.stringify(shiftList);

        localStorage.setItem(this.key, shiftListString);
    }

    static getShiftList(){
        return localStorage.getItem(this.key);
    }

    static deleteShiftList(){
        localStorage.removeItem(this.key);
    }
}