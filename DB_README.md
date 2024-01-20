# 1.DBの扱い方
関数を使用するときにDBで製作した関数を使用することでローカルストレージに保存をすることが可能になります。

## 1.1 支出のデータを扱う方法

### ファイルを読み込む方法
```html
        <script src="https://cdn.jsdelivr.net/npm/@babel/polyfill@latest/dist/polyfill.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@babel/standalone@latest/babel.min.js"></script>
        <script type="text/babel" data-presets="typescript" src="../../DB/shiftData/ShiftApi.ts"></script>
        <script type="text/babel" data-presets="typescript" src="../../DB/shiftData/ShiftEntity.ts"></script>
        <script type="text/babel" data-presets="typescript" src="../../DB/shiftData/ShiftRepository.ts"></script> 
```
と最初入力することでインポートされデータベースが使えるようになる

### データの扱いかた

#### 取得

使用例として、JavaScript上で
```js
getOutgo(){
    const outgoRepository = new OutgoRepository();
        const outgo = outgoRepository.getOutgoList();
        console.log(outgo);
}:
```
このようにすることでHTMLで使用でき、ログをコンソールで確認できるようにして
```html
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
            onclick="
                const outgoMain = new OutgoMain();
                outgoMain.getOutgo();
            "
        >
            全ての支出を表示
        </button>
```
HTML上ではこのようにすることでボタンを押すとログ上にローカルストレージ上のカレンダーが取得される

また月ごとに取得するためには
```js
getShiftMonthAll(){
        const shiftRepository = new ShiftRepository();
        const shiftMonthAll = shiftRepository.getShiftMonthAll(2021, 3);
        console.log(shiftMonthAll);
    }
```
```html
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
            onclick="
                const outgoMain = new OutgoMain();
                outgoMain.getOutgoMonthAll();
            "
        >
            今月の支出を表示
        </button>
```
とする

#### 追加

使用例として、JavaScript上で
```js
    setOutgo(){
        const outgoRepository = new OutgoRepository();

        const outgo = {
            id: 0,
            // 来月に変更する
            date: new Date(2021, 3, 1),
            time: 3,
        };

        const shiftList = shiftRepository.setShift(shift);
        console.log(shiftList);
    }
```
このようにすることでHTMLで使用でき、ログをコンソールで確認できるようにして
```html
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
            onclick="
                const shiftMain = new ShiftMain();
                shiftMain.getShift();
            "
        >
            カレンダーを確認
        </button>

```
HTML上ではこのようにすることでボタンを押すとログ上にローカルストレージ上のカレンダーが追加される

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
使用例として、JavaScript上で
```js
getShift(){
    const shiftRepository = new ShiftRepository();
    const shift = shiftRepository.getShiftList();
    console.log(shift);
};
```
このようにすることでHTMLで使用でき、ログをコンソールで確認できるようにして
```html
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
            onclick="
                const shiftMain = new ShiftMain();
                shiftMain.setShift();
            "
        >
            カレンダーを追加
        </button>
```
HTML上ではこのようにすることでボタンを押すとログ上にローカルストレージ上のカレンダーが取得される

また月ごとに取得するためには
```js
getShiftMonthAll(){
        const shiftRepository = new ShiftRepository();
        const shiftMonthAll = shiftRepository.getShiftMonthAll(2021, 3);
        console.log(shiftMonthAll);
    }
```
```html
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
            onclick="
                const shiftMain = new ShiftMain();
                shiftMain.getShiftMonthAll();
            "
        >
            シフトを月で取得
        </button>
```
とする


#### 追加
使用例として、JavaScript上で
```js
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
```
このようにすることでHTMLで使用でき、ログをコンソールで確認できるようにして
```html
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
            onclick="
                const shiftMain = new ShiftMain();
                shiftMain.getShift();
            "
        >
            カレンダーを確認
        </button>

```
HTML上ではこのようにすることでボタンを押すとログ上にローカルストレージ上のカレンダーが追加される
#### 消去
使用例として、JavaScript上で
```js
deleteShift(){

    const shiftRepository = new ShiftRepository();
    jobRepository.deleteJob(job);
    console.log(job);
}
```
このようにすることでHTMLで使用でき、ログをコンソールで確認できるようにして
```html
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
            onclick="
                const shiftMain = new ShiftMain();
                shiftMain.deleteShift();
            "
        >
            カレンダーを削除
        </button>
```
HTML上ではこのようにすることでボタンを押すとログ上にローカルストレージ上の設定が削除される

#### 更新

使用例として、JavaScript上で
```js
updateShift(){
    const shiftRepository = new ShiftRepository();
    const shift = shiftRepository.UpdateShift();
    console.log(shift);
};
```
このようにすることでHTMLで使用でき、ログをコンソールで確認できるようにして
```html
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
            onclick="
                const shiftMain = new ShiftMain();
                shiftMain.updateShift();
            "
        >
            カレンダーを更新
        </button>
```
HTML上ではこのようにすることでボタンを押すとログ上にローカルストレージ上のカレンダーが取得される

## 1.4 設定のデータを扱う方法

### ファイルを読み込む方法
```html
        <script src="https://cdn.jsdelivr.net/npm/@babel/polyfill@latest/dist/polyfill.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@babel/standalone@latest/babel.min.js"></script>
        <script type="text/babel" data-presets="typescript" src="../../DB/shiftData/ShiftApi.ts"></script>
        <script type="text/babel" data-presets="typescript" src="../../DB/shiftData/ShiftEntity.ts"></script>
        <script type="text/babel" data-presets="typescript" src="../../DB/shiftData/ShiftRepository.ts"></script> 
```
と最初入力することでインポートされデータベースが使えるようになる

### データの扱いかた

#### 取得
使用例として、JavaScript上で
```js
getJob(){
const jobRepository = new JobRepository();
const job = jobRepository.getJob();
console.log(job);
};
```
このようにすることでHTMLで使用でき、ログをコンソールで確認できるようにして
```html
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
    onclick="
        const jobSettingMain = new JobSettingMain();
        jobSettingMain.getJob();
    "
>
    設定を確認
</button>
```
HTML上ではこのようにすることでボタンを押すとログ上にローカルストレージ上の設定が表示される

#### 追加
使用例として、JavaScript上で
```js
setJob(){

    const jobRepository = new JobRepository();

    const job = {
        jobname: 'ファミリーマート',
        // 来月に変更する
        date: new Date(2021, 3, 15),
        price: 1000,
    };
    
    console.log(job);

    jobRepository.setJob(job);

}
```
このようにすることでHTMLで使用でき、ログをコンソールで確認できるようにして
```html
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
        onclick="
            const jobSettingMain = new JobSettingMain();
            jobSettingMain.setJob();
        "
    >
        設定を追加
    </button>

```
HTML上ではこのようにすることでボタンを押すとログ上にローカルストレージ上の設定が追加される

#### 消去
使用例として、JavaScript上で
```js
deleteJob(){

    const jobRepository = new JobRepository();
    jobRepository.deleteJob(job);
    console.log(job);
}
```
このようにすることでHTMLで使用でき、ログをコンソールで確認できるようにして
```html
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
        onclick="
            const jobSettingMain = new JobSettingMain();
            jobSettingMain.deleteJob();
        "
    >
        設定を削除
    </button>

```
HTML上ではこのようにすることでボタンを押すとログ上にローカルストレージ上の設定が削除される


