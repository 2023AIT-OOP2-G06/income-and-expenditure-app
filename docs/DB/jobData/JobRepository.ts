class JobRepository {
    
    // ================ GET ================

    // この関数はJobのデータを取得する
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

    // バイト先の設定のデータをもらうことで、DBに保存する
    // @param {JobModel} 
    // @return {JobModel[]} newJob
    setJob(
        newJob: JobModel
    ){
        // DBに保存されている文字列を取得する
        const db = JobApi.getJob();
        // 文字列からオブジェクトに変換をかける
        const Job:JobModel = JSON.parse(db? db : '[]');

        // DBに上書き保存をする
        JobApi.setJob(newJob);

        // 最新のJobを返す
        return JobApi.getJob();
    }

    // ================== DELETE ==================

    // バイト先の設定を削除する関数
    // @return {JobModel[]} Job
    deleteJob(){
        // 全ての支出を削除する
        JobApi.deleteJob();
        // 最新のListを返す
        return this.getJob();
    }
}