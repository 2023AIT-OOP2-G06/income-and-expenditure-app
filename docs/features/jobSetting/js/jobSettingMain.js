class JobSettingMain {
    getJob(){
        const jobRepository = new JobRepository();
        const job = jobRepository.getJob();
        console.log(job);
    };

    setJob(){

        const jobRepository = new JobRepository();

        // 取得
        const inputname = document.querySelector('#new-name');
        const inputDate = document.querySelector('#new-date');
        const inputPrice = document.querySelector('#new-price');
        const valName = inputname.value;
        const valDate = inputDate.value;
        const valPrice = inputPrice.value;
        inputname.value = '';
        inputDate.value = '';
        inputPrice.value = '';

        const job = {
            jobname:String(valName),
            // 来月に変更する
            payday:Number(valDate),
            price:Number(valPrice),
        };
        
        console.log(job);

        jobRepository.setJob(job);

    }
    
}