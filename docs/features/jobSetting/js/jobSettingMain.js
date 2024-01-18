class jobSettingMain {
    getJob(){
        const jobRepository = new JobRepository();
        const job = jobRepository.getjob();
        console.log(job);
    };

    setJob(){

        const job = {
            jobname: 'ファミリーマート',
            // 来月に変更する
            date: new Date(2021, 3, 15),
            price: 1000,
        };
        
        console.log(job);
    }
    
}