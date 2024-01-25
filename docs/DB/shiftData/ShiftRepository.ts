class ShiftRepository {
    
    // ================ GET ================

    // この関数はShiftのidを用いてShiftのデータを一つ取得する
    // @param {number} id
    // @return {ShiftModel} Shift
    getShift(
        id: number,
    ){
        // DBに保存されている文字列を取得する
        const db = ShiftApi.getShiftList();
        // 文字列からオブジェクトに変換をかける
        const shiftList:ShiftModel[] = JSON.parse(db? db : '[]');

        // idが同じShiftを取得
        const shift = shiftList.find(Shift => Shift.id === id);
        //返す
        return shift;
    }

    // この関数は全てのShiftを取得する
    // @return {ShiftModel[]} ShiftList
    getShiftList(
        sort: number,
    ){
        // DBに保存されている文字列を取得する
        const db = ShiftApi.getShiftList();
        // 文字列からオブジェクトに変換をかける
        const shiftList:ShiftModel[] = JSON.parse(db? db : '[]');
        
        if (sort === 1) {
            // 昇順
            shiftList.sort((a, b) => a.id - b.id);
        } else if (sort === 2) {
            // 降順
            shiftList.sort((a, b) => b.id - a.id);
        }

        //そのまま全てを返す
        return shiftList;
    }

    // この関数は年と月を用いてその条件にあうShiftを全て取得する
    // @param {number} year
    // @param {number} month
    // @return {ShiftModel[]} ShiftMonthAll
    getShiftMonthAll(
        year: number,
        month: number,
    ){
        // DBに保存されている文字列を取得する
        const db = ShiftApi.getShiftList();
        // 文字列からオブジェクトに変換をかける
        const shiftList:ShiftModel[] = JSON.parse(db? db : '[]');

        // 年と月でフィルターをかけてその月のShiftを全て出力させる
        const shiftMonthAll = shiftList.filter(shift => {
            const shiftDate = new Date(shift.date);
            const shiftYear = shiftDate.getFullYear();
            const shiftMonth = shiftDate.getMonth();

            return shiftYear === year && shiftMonth === month;
        });

        // 返す
        return shiftMonthAll;
    }   

    getShiftDayAll(
        year: number,
        month: number,
        day: number,
    ){
        // DBに保存されている文字列を取得する
        const db = ShiftApi.getShiftList();
        // 文字列からオブジェクトに変換をかける
        const shiftList:ShiftModel[] = JSON.parse(db? db : '[]');

        // 年と月と日にちでフィルターをかけてその月のShiftを全て出力させる
        const shiftDayAll = shiftList.filter(shift => {
            const shiftDate = new Date(shift.date);
            const shiftYear = shiftDate.getFullYear();
            const shiftMonth = shiftDate.getMonth();
            const shiftDay = shiftDate.getDate();

            return shiftYear === year && shiftMonth === month && shiftDay === day;
        });

        // 返す
        return shiftDayAll;
    }   

    // ================== SET ==================

    // Shiftのデータをもらうことで、DBに保存する
    // @param {ShiftModel} Shift
    // @return {ShiftModel[]} ShiftList
    setShift(
        shift: ShiftModel
    ){
        // DBに保存されている文字列を取得する
        const db = ShiftApi.getShiftList();
        // 文字列からオブジェクトに変換をかける
        const shiftList:ShiftModel[] = JSON.parse(db? db : '[]');

        // idを設定する
        // 一番最後の支出のidに1を足す
        // もしも被ってデータを消したりできない場合はUUIDに変換するといいかもしれない
        const lastShift = shiftList[shiftList.length - 1];
        shift.id = lastShift ? lastShift.id + 1 : 0;

        // 取得したListの最後に追加する
        shiftList.push(shift);
        // DBに上書き保存をする
        ShiftApi.setShiftList(shiftList);

        // 最新のListを返す
        return ShiftApi.getShiftList();
    }

    // Shiftリストをもらうことで、DBに保存する
    // @param {ShiftModel[]} ShiftList
    // @return {ShiftModel[]} ShiftList
    setShiftList(
        shiftList: ShiftModel[]
    ){
        // そのままDBを上書き保存する
        ShiftApi.setShiftList(shiftList);

        // 最新のListを返す
        return this.getShiftList();
    }

    // ================== DELETE ==================
    // 支出を削除する関数
    // @param {number} id
    // @return {ShiftModel[]} ShiftList
    deleteShift(
        id: number
    ){
        // DBに保存されている文字列を取得する
        const db = ShiftApi.getShiftList();
        // 文字列からオブジェクトに変換をかける
        const shiftList:ShiftModel[] = JSON.parse(db? db : '[]');

        // idが同じ支出をフィルターかける
        const newShiftList = shiftList.filter(shift => shift.id !== id);
        // DBに上書き保存をする
        ShiftApi.setShiftList(newShiftList);

        // 最新のListを返す
        return this.getShiftList();
    }

    // 全てのShiftを削除する関数
    // @return {ShiftModel[]} ShiftList
    deleteShiftList(){
        // 全てのShiftを削除する
        ShiftApi.deleteShiftList();
        // 最新のListを返す
        return this.getShiftList();
    }

    // ================== UPDATE ==================

    // Shiftを更新する関数
    // @param {ShiftModel} Shift
    // @return {ShiftModel[]} ShiftList
    updateShift(
        shift: ShiftModel
    ){
        // DBに保存されている文字列を取得する
        const db = ShiftApi.getShiftList();
        // 文字列からオブジェクトに変換をかける
        const shiftList:ShiftModel[] = JSON.parse(db? db : '[]');
        // idが同じShiftを消す
        const newShiftList = shiftList.filter(it => it.id !== shift.id);
        // 新しいShiftを追加する
        newShiftList.push(shift);

        // DBに上書き保存をする
        ShiftApi.setShiftList(newShiftList);
        // 最新のListを返す
        return this.getShiftList();
    }
}