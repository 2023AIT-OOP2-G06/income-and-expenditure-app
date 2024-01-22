class OutgoApi {
    private static key: string = 'outgoList';

    // @param {outgoModel[]} outgoList
    static setOutgoList(
        outgoList: OutgoModel[]
    ) {
        // dataでソートする
        outgoList.sort(
            (x, y) => (new Date(x.date).getTime()) - (new Date(y.date).getTime()),
        )

        const outgoListString = JSON.stringify(outgoList ,function(key, value) {
            if (this[key] instanceof Date) {
               return this[key].ttoLocaleString("ja");
            }
            return value;
         });

        localStorage.setItem(this.key, outgoListString);
    }

    static getOutgoList(){
        return localStorage.getItem(this.key);
    }

    static deleteOutgoList(){
        localStorage.removeItem(this.key);
    }
}