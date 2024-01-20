# 1.DBの扱い方
関数を使用するときにDBで製作した関数を使用することでローカルストレージに保存をすることが可能になります。

## 1.1 支出のデータを扱う方法

### ファイルを読み込む方法

### データの扱いかた

#### 取得

#### 追加

#### 消去

#### 更新

## 1.2 収支のデータを扱う方法

### ファイルを読み込む方法

### データの扱いかた

#### 取得

#### 追加

#### 消去

#### 更新

## 1.3 シフトデータを扱う方法

### ファイルを読み込む方法

### データの扱いかた

#### 取得
    getJob()
    {
        // DBに保存されている文字列を取得する
        const db = JobApi.getJob();
        // 文字列からオブジェクトに変換をかける
        const job:JobModel = JSON.parse(db? db : '[]');

        //返す
        return job;
    }
データベース上はこのようになっており、文字列をJSONに変換してリターンする。その後、JobApi上の
    static setJob(
        job: JobModel
    ) {

        const jobString = JSON.stringify(job);

        localStorage.setItem(this.key, jobString);
    }
によってローカルストレージに保存される。

使用例として

#### 追加
    setShift(){
    const shiftRepository = new ShiftRepository();

    const shift = {
        id: 0,
        // 来月に変更する
        date: new Date(2021, 3, 1),
        time: 3,    
    };

    const shiftList = shiftRepository.setShift(shift);
    console.log(shiftList);
    }

これによってシフトに入っているものがシフトリストに追加されます。
シフトの部分を変更することで自由に設定ができます

#### 消去

#### 更新

## 1.4 設定のデータを扱う方法

### ファイルを読み込む方法

### データの扱いかた

#### 取得
    getJob()
    {
        // DBに保存されている文字列を取得する
        const db = JobApi.getJob();
        // 文字列からオブジェクトに変換をかける
        const job:JobModel = JSON.parse(db? db : '[]');

        //返す
        return job;
    }
データベース上はこのようになっており、文字列をJSONに変換してリターンする。その後、JobApi上の
    static getJob(){
        return localStorage.getItem(this.key);
    }
によってローカルストレージから取得される。

使用例として、JavaScript上で
    getJob(){
        const jobRepository = new JobRepository();
        const job = jobRepository.getJob();
        console.log(job);
    };
このようにすることgetJobをHTMLで使用でき、ログをコンソールで確認できるようにして
   <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
            onclick="
                const jobSettingMain = new JobSettingMain();
                jobSettingMain.getJob();
            "
        >
            設定を確認
        </button>
HTML上ではこのようにすることでボタンを押すとログ上にローカルストレージ上の設定が表示される

#### 追加
    setJob(
        newJob: JobModel
    ){
        // DBに上書き保存をする
        JobApi.setJob(newJob);

        // 最新のJobを返す
        return JobApi.getJob();
    }
データベース上はこのようになっており、文字列をJSONに変換してリターンする。その後、JobApi上の
    static setJob(
        job: JobModel
    ) {

        const jobString = JSON.stringify(job);

        localStorage.setItem(this.key, jobString);
    }
によってローカルストレージに保存される。

使用例として、JavaScript上で
    getJob(){
        const jobRepository = new JobRepository();
        const job = jobRepository.getJob();
        console.log(job);
    };
このようにすることgetJobをHTMLで使用でき、ログをコンソールで確認できるようにして
   <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
            onclick="
                const jobSettingMain = new JobSettingMain();
                jobSettingMain.getJob();
            "
        >
            設定を確認
        </button>
HTML上ではこのようにすることでボタンを押すとログ上にローカルストレージ上の設定が表示される


#### 消去

#### 更新
