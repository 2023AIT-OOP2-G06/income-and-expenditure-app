//TODO:中身を作成する
class JobApi {
    private static key: string = 'JobList';

    // @param {JobModel[]} JobList
    static setJob(
        job: JobModel
    ) {

        const JobString = JSON.stringify(job);

        localStorage.setItem(this.key, JobString);
    }

    static getJob(){
        return localStorage.getItem(this.key);
    }

    static deleteJob(){
        localStorage.removeItem(this.key);
    }
}