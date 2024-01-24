class JobSettingMain {
    getJob(){
        const jobRepository = new JobRepository();
        const job = jobRepository.getJob();
        console.log(job);
    };

    setJob(){

        const jobRepository = new JobRepository();

        const job = {
            jobname: 'ファミリーマート',
            // 来月に変更する
            payday: 15,
            price: 1000,
        };
        
        console.log(job);

        jobRepository.setJob(job);

    }
    
}