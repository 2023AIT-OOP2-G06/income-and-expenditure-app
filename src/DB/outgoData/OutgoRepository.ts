class OutgoRepository {
    
    // @param {number} id
    getOutgo(
        id: number,
    ){
        const db = OutgoApi.getOutgoList();
        const outgoList:OutgoModel[] = JSON.parse(db? db : '[]');

        const outgo = outgoList.find(outgo => outgo.id === id);
        return outgo;
    }

    // @param {number} year
    // @param {number} month
    getOutgoMonthAll(
        year: number,
        month: number,
    ){
        const db = OutgoApi.getOutgoList();
        const outgoList:OutgoModel[] = JSON.parse(db? db : '[]');

        const outgoMonthAll = outgoList.filter(outgo => {
            const outgoDate = new Date(outgo.date);
            const outgoYear = outgoDate.getFullYear();
            const outgoMonth = outgoDate.getMonth() + 1;

            return outgoYear === year && outgoMonth === month;
        });

        return outgoMonthAll;
    }   

    getOutgoList(){
        const db = OutgoApi.getOutgoList();
        const outgoList:OutgoModel[] = JSON.parse(db? db : '[]');

        return outgoList;
    }

    // @param {OutgoModel} outgo
    setOutgo(
        outgo: OutgoModel
    ){
        const db = OutgoApi.getOutgoList();
        const outgoList:OutgoModel[] = JSON.parse(db? db : '[]');

        const lastOutgo = outgoList[outgoList.length - 1];
        outgo.id = lastOutgo ? lastOutgo.id + 1 : 0;

        outgoList.push(outgo);
        OutgoApi.setOutgoList(outgoList);

        return OutgoApi.getOutgoList();
    }

    // @param {OutgoModel[]} outgoList
    setOutgoList(
        outgoList: OutgoModel[]
    ){
        OutgoApi.setOutgoList(outgoList);
        

        return this.getOutgoList();
    }

    // @param {number} id
    deleteOutgo(
        id: number
    ){
        const db = OutgoApi.getOutgoList();
        const outgoList:OutgoModel[] = JSON.parse(db? db : '[]');

        const newOutgoList = outgoList.filter(outgo => outgo.id !== id);

        OutgoApi.setOutgoList(newOutgoList);

        return this.getOutgoList();
    }

    deleteOutgoList(){
        OutgoApi.deleteOutgoList();

        return this.getOutgoList();
    }

    // @param {OutgoModel} outgo
    updateOutgo(
        outgo: OutgoModel
    ){
        const db = OutgoApi.getOutgoList();
        const outgoList:OutgoModel[] = JSON.parse(db? db : '[]');

        const newOutgoList = outgoList.filter(it => it.id !== outgo.id);

        newOutgoList.push(outgo);

        OutgoApi.setOutgoList(newOutgoList);

        return this.getOutgoList();
    }
}