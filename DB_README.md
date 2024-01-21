# 1.DBの扱い方
関数を使用するときにDBで製作した関数を使用することでローカルストレージに保存をすることが可能になります。

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
const outgo = outgoRepository.getOutgo(o);
```


また月ごとに取得するためには
```js
const outgoRepository = new OutgoRepository();
const outgoMonthAll = outgoRepository.getOutgoMonthAll(2021, 3);
```

#### 追加
使用例として、JavaScript上で
```js
const outgoRepository = new OutgoRepository();

const outgo = {
    id: 0,
    //IDは自動で増えていくため初期値ば0になる
    date: new Date(2021, 3, 1),
    price: 1000,
};

const outgoList = outgoRepository.setOutgo(outgo);
```

#### 消去
使用例として、JavaScript上で
```js
const outgoMain = new OutgoRepository();
const outgo = 0;
//outgo はデリートしたいidを入力します
OutgoMain.deleteOutgo(outgo);
```

#### 更新

使用例として、JavaScript上で
```js
const OutgoMain = new OutgoRepository();
const outgo = OutgoMain.UpdateOutgo(2);//id2のデータを更新します
```

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
const shift = shiftRepository.getShift(o);
```

また月ごとに取得するためには
```js
const shiftRepository = new ShiftRepository();
const shiftMonthAll = shiftRepository.getShiftMonthAll(2021, 3);
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
const shift = shiftRepository.UpdateShift(1);//id1の部分を更新します
```


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

#### 消去
使用例として、JavaScript上で
```js
const jobRepository = new JobRepository();
jobRepository.deleteJob(job);
```


