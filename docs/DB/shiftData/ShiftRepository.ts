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
        const ShiftList:ShiftModel[] = JSON.parse(db? db : '[]');

        // idが同じShiftを取得
        const Shift = ShiftList.find(Shift => Shift.id === id);
        //返す
        return Shift;
    }

    // この関数は全てのShiftを取得する
    // @return {ShiftModel[]} ShiftList
    getShiftList(){
        // DBに保存されている文字列を取得する
        const db = ShiftApi.getShiftList();
        // 文字列からオブジェクトに変換をかける
        const ShiftList:ShiftModel[] = JSON.parse(db? db : '[]');

        //そのまま全てを返す
        return ShiftList;
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
        const ShiftList:ShiftModel[] = JSON.parse(db? db : '[]');

        // 年と月でフィルターをかけてその月のShiftを全て出力させる
        const ShiftMonthAll = ShiftList.filter(Shift => {
            const ShiftDate = new Date(Shift.date);
            const ShiftYear = ShiftDate.getFullYear();
            const ShiftMonth = ShiftDate.getMonth() + 1;

            return ShiftYear === year && ShiftMonth === month;
        });

        // 返す
        return ShiftMonthAll;
    }   

    // ================== SET ==================

    // Shiftのデータをもらうことで、DBに保存する
    // @param {ShiftModel} Shift
    // @return {ShiftModel[]} ShiftList
    setShift(
        Shift: ShiftModel
    ){
        // DBに保存されている文字列を取得する
        const db = ShiftApi.getShiftList();
        // 文字列からオブジェクトに変換をかける
        const ShiftList:ShiftModel[] = JSON.parse(db? db : '[]');

        // idを設定する
        // 一番最後の支出のidに1を足す
        // もしも被ってデータを消したりできない場合はUUIDに変換するといいかもしれない
        const lastShift = ShiftList[ShiftList.length - 1];
        Shift.id = lastShift ? lastShift.id + 1 : 0;

        // 取得したListの最後に追加する
        ShiftList.push(Shift);
        // DBに上書き保存をする
        ShiftApi.setShiftList(ShiftList);

        // 最新のListを返す
        return ShiftApi.getShiftList();
    }

    // Shiftリストをもらうことで、DBに保存する
    // @param {ShiftModel[]} ShiftList
    // @return {ShiftModel[]} ShiftList
    setShiftList(
        ShiftList: ShiftModel[]
    ){
        // そのままDBを上書き保存する
        ShiftApi.setShiftList(ShiftList);

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
        const ShiftList:ShiftModel[] = JSON.parse(db? db : '[]');

        // idが同じ支出をフィルターかける
        const newShiftList = ShiftList.filter(Shift => Shift.id !== id);
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
        Shift: ShiftModel
    ){
        // DBに保存されている文字列を取得する
        const db = ShiftApi.getShiftList();
        // 文字列からオブジェクトに変換をかける
        const ShiftList:ShiftModel[] = JSON.parse(db? db : '[]');
        // idが同じShiftを消す
        const newShiftList = ShiftList.filter(it => it.id !== Shift.id);
        // 新しいShiftを追加する
        newShiftList.push(Shift);

        // DBに上書き保存をする
        ShiftApi.setShiftList(newShiftList);
        // 最新のListを返す
        return this.getShiftList();
    }
}