class JobApi {
    private static key: string = 'Job';

    // @param {JobModel} Job
    static setJob(
        job: JobModel
    ) {

        const jobString = JSON.stringify(job);

        localStorage.setItem(this.key, jobString);
    }

    static getJob(){
        return localStorage.getItem(this.key);
    }

    static deleteJob(){
        localStorage.removeItem(this.key);
    }
}