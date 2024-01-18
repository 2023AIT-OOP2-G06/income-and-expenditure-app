class JobApi {
    private static key: string = 'JobList';

    // @param {JobModel[]} Job
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