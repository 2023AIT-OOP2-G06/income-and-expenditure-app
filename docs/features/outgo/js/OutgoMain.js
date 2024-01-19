class OutgoMain { 
    getOutgo(){
        const outgoRepository = new OutgoRepository();
        const outgo = outgoRepository.getOutgoList();
        console.log(outgo);
        
        // 画面上に表示
        const ulPointer = document.querySelector('ul');
        while(ulPointer.firstChild){// 一旦全消去
            ulPointer.removeChild(ulPointer.firstChild);
        }
        outgo.forEach(element => {
            const newLi = document.createElement('li');
            newLi.classList.add('list-group-item');
            const newDate = document.createElement('div');
            // dateの表示を年月日に限定
            const spStr = element.date.split('T');
            newDate.innerText = spStr[0];
            newLi.appendChild(newDate);
            const newPrice = document.createElement('div');
            newPrice.innerText = element.price;
            newLi.appendChild(newPrice);
            /*
            <li class='list-group-item'>
                <div>spStr[0]</div>
                <div>element.price</div>
            </li>
             */
            ulPointer.appendChild(newLi);
        });
    };

    setOutgo(){
        const outgoRepository = new OutgoRepository();

        // 取得
        const inputDate = document.querySelector('#new-date');
        const inputPrice = document.querySelector('#new-price');
        const valDate = inputDate.value;
        const valPrice = inputPrice.value;
        inputDate.value = '';
        inputPrice.value = '';

        try {
            // 空欄の判定(Priceが半角数字以外でもここで判定可能)
            if(valDate == '' || valPrice == ''){
                throw new Error('入力に誤りがあります');
            }
            // [0]-year,[1]-month,[2]-day
            const strDate = valDate.split('-');

            const outgo = {
                id: 0,
                // 今月に調整->strDate[1]-1、今日に調整->strDate[2]+1
                date: new Date(Number(strDate[0]), Number(strDate[1])-1, Number(strDate[2])+1),
                price: Number(valPrice),
            };
    
            const outgoList = outgoRepository.setOutgo(outgo);
            console.log(outgoList);
            // リストの更新
            this.getOutgo()
        } catch (e) {
            console.log(e.name, e.message);
            alert(e.message);
        }

    }

    getOutgoMonthAll(){
        const outgoRepository = new OutgoRepository();
        const outgoMonthAll = outgoRepository.getOutgoMonthAll(2024, 1);
        console.log(outgoMonthAll);
    }
}

window.onload = function() {

    setTimeout(function() {
        const outgoMain = new OutgoMain();
        outgoMain.getOutgo();
    }, 100);
    
}