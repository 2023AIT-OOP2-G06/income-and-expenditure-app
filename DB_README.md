# 1.DBの扱い方
関数を使用するときにDBで製作した関数を使用することでローカルストレージに保存をすることが可能になります。

ページの読み込みが早いとが早いとtsを使用している関係上エラーが起こるためレポジトリが読み取れなくなります。

```js
function main() {
  const outgoRepository = new OutgoRepository();
  const outgo = outgoRepository.getOutgo(0);
}

// 大体 100ミリ秒後に main 関数が動き出す
setTimeout(main, 100);
```

このように少し遅らせるようにすると解消されます
## 1.1 支出のデータを扱う方法

### ファイルを読み込む方法
```html
<script src="https://cdn.jsdelivr.net/npm/@babel/polyfill@latest/dist/polyfill.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@babel/standalone@latest/babel.min.js"></script>
<script type="text/babel" data-presets="typescript" src="../../DB/outgoData/OutgoApi.ts"></script>
<script type="text/babel" data-presets="typescript" src="../../DB/outgoData/OutgoEntity.ts"></script>
<script type="text/babel" data-presets="typescript" src="../../DB/outgoData/OutgoRepository.ts"></script>
```
と最初入力することでインポートされデータベースが使えるようになる

### データの扱いかた

#### 取得
使用例として、JavaScript上で全体を取得する場合は
```js
const outgoRepository = new OutgoRepository();
const outgo = outgoRepository.getOutgoList();
```

id毎にデータを取得するためには
```js
const outgoRepository = new OutgoRepository();
const outgo = outgoRepository.getOutgo(0);
```


また月ごとに取得するためには
```js
const outgoRepository = new OutgoRepository();
const outgoMonthAll = outgoRepository.getOutgoMonthAll(2021, 3);
```
月ごとにデータを取得するとjsonファイルはこうなります
```json
[
    {
        "id": 0,
        "date": "2021-03-31T15:00:00.000Z",
        "price": 1000
    },
    {
        "id": 1,
        "date": "2021-03-31T15:00:00.000Z",
        "price": 1000
    },
    {
        "id": 2,
        "date": "2021-03-31T15:00:00.000Z",
        "price": 1000
    },
    {
        "id": 3,
        "date": "2021-03-31T15:00:00.000Z",
        "price": 1000
    }
]
```
#### 追加
使用例として、JavaScript上で
```js
const outgoRepository = new OutgoRepository();

const outgo = {
    id: 0,
    //IDは自動で増えていくため初期値は0でもよい
    date: new Date(2021, 3, 1),
    price: 1000,
};

const outgoList = outgoRepository.setOutgo(outgo);
```

#### 消去
使用例として、JavaScript上で
```js
const outgoRepository = new OutgoRepository();
const id = 0;
//outgo はデリートしたいidを入力します
outgoRepository.deleteOutgo(id);
```

#### 更新

使用例として、JavaScript上で
```js
const outgoRepository = new OutgoRepository();
const newOutgo = {
    id: 0,
    //IDは自動で増えていくため初期値は0でもよい
    date: new Date(2021, 3, 1),
    price: 1000,
};
const outgo = outgoRepository.UpdateOutgo(newOutgo);
```

これを行うと重複したIdのデータが会ったときに古い方のIdのデータを新しいデータに更新する
## 1.2 収支のデータを扱う方法

### ファイルを読み込む方法
```html
<script src="https://cdn.jsdelivr.net/npm/@babel/polyfill@latest/dist/polyfill.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@babel/standalone@latest/babel.min.js"></script>
<script type="text/babel" data-presets="typescript" src="../../DB/shiftData/ShiftApi.ts"></script>
<script type="text/babel" data-presets="typescript" src="../../DB/shiftData/ShiftEntity.ts"></script>
<script type="text/babel" data-presets="typescript" src="../../DB/shiftData/ShiftRepository.ts"></script> 

<script type="text/babel" data-presets="typescript" src="../../DB/outgoData/OutgoApi.ts"></script>
<script type="text/babel" data-presets="typescript" src="../../DB/outgoData/OutgoEntity.ts"></script>
<script type="text/babel" data-presets="typescript" src="../../DB/outgoData/OutgoRepository.ts"></script>

<script type="text/babel" data-presets="typescript" src="../../DB/jobData/JobApi.ts"></script>
<script type="text/babel" data-presets="typescript" src="../../DB/jobData/JobEntity.ts"></script>
<script type="text/babel" data-presets="typescript" src="../../DB/jobData/JobRepository.ts"></script> 
```
と最初入力することでインポートされデータベースが使えるようになる。
収支管理は全てのデータベースを使用する

### データの扱いかた
基本的に他の三つのものと変わらない。
全てを使用しつつ取得したものを組み合わせて表示をさせる必要がある。

## 1.3 シフトデータを扱う方法

### ファイルを読み込む方法
```html
<script src="https://cdn.jsdelivr.net/npm/@babel/polyfill@latest/dist/polyfill.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@babel/standalone@latest/babel.min.js"></script>
<script type="text/babel" data-presets="typescript" src="../../DB/shiftData/ShiftApi.ts"></script>
<script type="text/babel" data-presets="typescript" src="../../DB/shiftData/ShiftEntity.ts"></script>
<script type="text/babel" data-presets="typescript" src="../../DB/shiftData/ShiftRepository.ts"></script> 
```

### データの扱いかた

#### 取得
使用例として、JavaScript上で全体のデータを取得したい場合は
```js
const shiftRepository = new ShiftRepository();
const shift = shiftRepository.getShiftList();
```

id毎にデータを取得するためには
```js
const shiftRepository = new ShiftRepository();
const id = 0;
const shift = shiftRepository.getShift(id);
```

また月ごとに取得するためには
```js
const shiftRepository = new ShiftRepository();
const shiftMonthAll = shiftRepository.getShiftMonthAll(2021, 3);
```
月ごとにデータを取得するとjsonファイルはこうなります
```json
[
    {
        "id": 0,
        "date": "2021-03-31T15:00:00.000Z",
        "moment": "2021-04-01T03:00:00.000Z",
        "time": 3
    },
    {
        "id": 1,
        "date": "2021-03-31T15:00:00.000Z",
        "moment": "2021-04-01T03:00:00.000Z",
        "time": 3
    },
    {
        "id": 2,
        "date": "2021-03-31T15:00:00.000Z",
        "moment": "2021-04-01T03:00:00.000Z",
        "time": 3
    },
    {
        "id": 3,
        "date": "2021-03-31T15:00:00.000Z",
        "moment": "2021-04-01T03:00:00.000Z",
        "time": 3
    }
]
```

#### 追加
使用例として、JavaScript上で
```js
const shiftRepository = new ShiftRepository();

const shift = {
    id: 0,
    // Idは自動で更新されるのでここでは初期値の0
    date: new Date(2021, 3, 1),
    time: 3,
};

const shiftList = shiftRepository.setShift(shift);
```

#### 消去
使用例として、JavaScript上で
```js
const shiftRepository = new ShiftRepository();
const id = 0;
//idが０の部分をデリートします
shiftRepository.deleteShift(id);
```
#### 更新

使用例として、JavaScript上で
```js
const shiftRepository = new ShiftRepository();
const newShift = {
    id: 0,
    date: new Date(2021, 3, 1),
    time: 3,
};
const shift = shiftRepository.updateShift(newShift);
```

これを行うと重複したIdのデータが会ったときに古い方のIdのデータを新しいデータに更新する
## 1.4 設定のデータを扱う方法

### ファイルを読み込む方法
```html
<script src="https://cdn.jsdelivr.net/npm/@babel/polyfill@latest/dist/polyfill.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@babel/standalone@latest/babel.min.js"></script>
<script type="text/babel" data-presets="typescript" src="../../DB/jobData/JobApi.ts"></script>
<script type="text/babel" data-presets="typescript" src="../../DB/jobData/JobEntity.ts"></script>
<script type="text/babel" data-presets="typescript" src="../../DB/jobData/JobRepository.ts"></script> 
```
と最初入力することでインポートされデータベースが使えるようになる

### データの扱いかた

#### 取得
使用例として、JavaScript上で
```js
const jobRepository = new JobRepository();
const job = jobRepository.getJob();
```
このようにすることでHTMLで使用でき、ログをコンソールで確認できるようにして


#### 追加
使用例として、JavaScript上で
```js
const jobRepository = new JobRepository();

const job = {
jobname: 'ファミリーマート',
date: new Date(2021, 3, 15),
price: 1000,
};

jobRepository.setJob(job);
```
年の記述に関しては自由で、Dateの関係上必要だけど、特に見ていない
#### 消去
使用例として、JavaScript上で
```js
const jobRepository = new JobRepository();
jobRepository.deleteJob();
```

