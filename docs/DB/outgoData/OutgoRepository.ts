class OutgoRepository {
    
    // ================ GET ================

    // この関数は支出のidを用いて支出のデータを一つ取得する
    // @param {number} id
    // @return {OutgoModel} outgo
    getOutgo(
        id: number,
    ){
        // DBに保存されている文字列を取得する
        const db = OutgoApi.getOutgoList();
        // 文字列からオブジェクトに変換をかける
        const outgoList:OutgoModel[] = JSON.parse(db? db : '[]');

        // idが同じ支出を取得
        const outgo = outgoList.find(outgo => outgo.id === id);
        //返す
        return outgo;
    }

    // この関数は全ての支出を取得する
    // @return {OutgoModel[]} outgoList
    getOutgoList(){
        // DBに保存されている文字列を取得する
        const db = OutgoApi.getOutgoList();
        // 文字列からオブジェクトに変換をかける
        const outgoList:OutgoModel[] = JSON.parse(db? db : '[]');

        //そのまま全てを返す
        return outgoList;
    }

    // この関数は年を用いてその条件にあう支出を全て取得する
    // @param {number} year
    // @return {OutgoModel[]} outgoMonthAll
    getOutgoYearAll(
        year: number,
    ){
        // DBに保存されている文字列を取得する
        const db = OutgoApi.getOutgoList();
        // 文字列からオブジェクトに変換をかける
        const outgoList:OutgoModel[] = JSON.parse(db? db : '[]');

        // 年と月でフィルターをかけてその月の支出を全て出力させる
        const outgoMonthAll = outgoList.filter(outgo => {
            const outgoDate = new Date(outgo.date);
            const outgoYear = outgoDate.getFullYear();

            return outgoYear === year;
        });

        // 返す
        return outgoMonthAll;
    }   

    // この関数は年と月を用いてその条件にあう支出を全て取得する
    // @param {number} year
    // @param {number} month
    // @return {OutgoModel[]} outgoMonthAll
    getOutgoMonthAll(
        year: number,
        month: number,
    ){
        // DBに保存されている文字列を取得する
        const db = OutgoApi.getOutgoList();
        // 文字列からオブジェクトに変換をかける
        const outgoList:OutgoModel[] = JSON.parse(db? db : '[]');

        // 年と月でフィルターをかけてその月の支出を全て出力させる
        const outgoMonthAll = outgoList.filter(outgo => {
            const outgoDate = new Date(outgo.date);
            const outgoYear = outgoDate.getFullYear();
            const outgoMonth = outgoDate.getMonth();

            return outgoYear === year && outgoMonth === month;
        });

        // 返す
        return outgoMonthAll;
    }   

    // ================== SET ==================

    // 支出のデータをもらうことで、DBに保存する
    // @param {OutgoModel} outgo
    // @return {OutgoModel[]} outgoList
    setOutgo(
        outgo: OutgoModel
    ){
        // DBに保存されている文字列を取得する
        const db = OutgoApi.getOutgoList();
        // 文字列からオブジェクトに変換をかける
        const outgoList:OutgoModel[] = JSON.parse(db? db : '[]');

        // idを設定する
        // 一番最後の支出のidに1を足す
        // もしも被ってデータを消したりできない場合はUUIDに変換するといいかもしれない
        const lastOutgo = outgoList[outgoList.length - 1];
        outgo.id = lastOutgo ? lastOutgo.id + 1 : 0;

        // 取得したListの最後に追加する
        outgoList.push(outgo);
        // DBに上書き保存をする
        OutgoApi.setOutgoList(outgoList);

        // 最新のListを返す
        return OutgoApi.getOutgoList();
    }

    // 支出リストをもらうことで、DBに保存する
    // @param {OutgoModel[]} outgoList
    // @return {OutgoModel[]} outgoList
    setOutgoList(
        outgoList: OutgoModel[]
    ){
        // そのままDBを上書き保存する
        OutgoApi.setOutgoList(outgoList);

        // 最新のListを返す
        return this.getOutgoList();
    }

    // ================== DELETE ==================
    // 支出を削除する関数
    // @param {number} id
    // @return {OutgoModel[]} outgoList
    deleteOutgo(
        id: number
    ){
        // DBに保存されている文字列を取得する
        const db = OutgoApi.getOutgoList();
        // 文字列からオブジェクトに変換をかける
        const outgoList:OutgoModel[] = JSON.parse(db? db : '[]');

        // idが同じ支出をフィルターかける
        const newOutgoList = outgoList.filter(outgo => outgo.id !== id);
        // DBに上書き保存をする
        OutgoApi.setOutgoList(newOutgoList);

        // 最新のListを返す
        return this.getOutgoList();
    }

    // 全ての支出を削除する関数
    // @return {OutgoModel[]} outgoList
    deleteOutgoList(){
        // 全ての支出を削除する
        OutgoApi.deleteOutgoList();
        // 最新のListを返す
        return this.getOutgoList();
    }

    // ================== UPDATE ==================

    // 支出を更新する関数
    // @param {OutgoModel} outgo
    // @return {OutgoModel[]} outgoList
    updateOutgo(
        outgo: OutgoModel
    ){
        // DBに保存されている文字列を取得する
        const db = OutgoApi.getOutgoList();
        // 文字列からオブジェクトに変換をかける
        const outgoList:OutgoModel[] = JSON.parse(db? db : '[]');
        // idが同じ支出を消す
        const newOutgoList = outgoList.filter(it => it.id !== outgo.id);
        // 新しい支出を追加する
        newOutgoList.push(outgo);

        // DBに上書き保存をする
        OutgoApi.setOutgoList(newOutgoList);
        // 最新のListを返す
        return this.getOutgoList();
    }
}