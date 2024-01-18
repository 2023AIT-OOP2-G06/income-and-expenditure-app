class jobSettingMain {
    getJob(){
        const JobRepository = new JobRepository();
        const job = JobRepository.getjob();
        console.log(job);
    };

    setJob(){
        const JobRepository = new JobRepository();

        const job = {
            jobname: 'ファミリーマート',
            // 来月に変更する
            date: new Date(2021, 3, 15),
            price: 1000,
        };
        
        console.log(job);
    }
    
}