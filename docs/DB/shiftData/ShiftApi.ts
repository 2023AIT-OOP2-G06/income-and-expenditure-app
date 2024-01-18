class ShiftApi {
    private static key: string = 'ShiftList';

    // @param {ShiftModel[]} ShiftList
    static setShiftList(
        ShiftList: ShiftModel[]
    ) {
        // dataでソートする
        ShiftList.sort(
            (x, y) => (new Date(x.date).getTime()) - (new Date(y.date).getTime()),
        )

        const ShiftListString = JSON.stringify(ShiftList);

        localStorage.setItem(this.key, ShiftListString);
    }

    static getShiftList(){
        return localStorage.getItem(this.key);
    }

    static deleteShiftList(){
        localStorage.removeItem(this.key);
    }
}