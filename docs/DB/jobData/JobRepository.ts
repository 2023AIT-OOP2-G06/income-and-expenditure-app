//TODO:中身を作成する
class JobRepository {
    
    // ================ GET ================

    // この関数は支出のidを用いて支出のデータを一つ取得する
    // @param {number} id
    // @return {JobModel} Job
    getJob()
    {
        // DBに保存されている文字列を取得する
        const db = JobApi.getJob();
        // 文字列からオブジェクトに変換をかける
        const job:JobModel = JSON.parse(db? db : '[]');

        //返す
        return job;
    }


    // ================== SET ==================

    // 支出のデータをもらうことで、DBに保存する
    // @param {OutgoModel} outgo
    // @return {OutgoModel[]} outgoList
    setJob(
        newJob: JobModel
    ){
        // DBに保存されている文字列を取得する
        const db = JobApi.getJob();
        // 文字列からオブジェクトに変換をかける
        const job:JobModel = JSON.parse(db? db : '[]');

        // DBに上書き保存をする
        JobApi.setJob(newJob);

        // 最新のListを返す
        return JobApi.getJob();
    }

    // ================== DELETE ==================

    // 全ての支出を削除する関数
    // @return {OutgoModel[]} outgoList
    deleteJob(){
        // 全ての支出を削除する
        JobApi.deleteJob();
        // 最新のListを返す
        return this.getJob();
    }
}