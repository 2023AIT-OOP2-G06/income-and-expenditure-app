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

        try{
            if(valDate < 1 || valDate > 31){
                throw new Error('日付が不適切です');
            }
            const job = {
                jobname:String(valName),
                // 来月に変更する
                payday:Number(valDate),
                price:Number(valPrice),
            };
            
            console.log(job);
    
            jobRepository.setJob(job);
    
            alert('保存完了');

        }catch(e){
            console.log(e.name,e.message);
            alert(e.message);
        }

    }
    
}

window.onload = function() {

    setTimeout(function() {
        const jobRepository = new JobRepository();
        const job = jobRepository.getJob();
        console.log(job);

        let valJobName = job.jobname;
        if(typeof(job.jobname) === 'undefined'){
            valJobName = '';
        }

        const inputname = document.querySelector('#new-name');
        const inputDate = document.querySelector('#new-date');
        const inputPrice = document.querySelector('#new-price');
        inputname.value = valJobName;
        inputDate.value = job.payday;
        inputPrice.value = job.price;
    },100);
}