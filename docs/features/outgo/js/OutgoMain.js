class OutgoMain {
    getOutgo(){
        const outgoRepository = new OutgoRepository();
        const outgo = outgoRepository.getOutgoList();
        console.log(outgo);
    };

    setOutgo(){
        const outgoRepository = new OutgoRepository();

        const outgo = {
            id: 0,
            // 来月に変更する
            date: new Date(2021, 3, 1),
            price: 1000,
        };

        const outgoList = outgoRepository.setOutgo(outgo);
        console.log(outgoList);
    }

    getOutgoMonthAll(){
        const outgoRepository = new OutgoRepository();
        const outgoMonthAll = outgoRepository.getOutgoMonthAll(2024, 1);
        console.log(outgoMonthAll);
    }
}