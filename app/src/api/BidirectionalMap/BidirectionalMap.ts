export class BidirectionalMap<A, B> {
    private aData: A[] = [];

    private bData: B[] = [];

    set = (a: A, b: B) => {
        const aId = this.aData.indexOf(a);
        const bId = this.bData.indexOf(b);

        if (aId !== -1 || bId !== -1) {
            return;
        }

        this.aData.push(a);
        this.bData.push(b);
    };

    setB = (a: A, b: B) => {
        const aId = this.aData.indexOf(a);
        const bId = this.bData.indexOf(b);

        if (aId === -1 || bId !== -1) {
            return false;
        }

        this.bData[aId] = b;
        return true;
    };

    setA = (b: B, a: A) => {
        const aId = this.aData.indexOf(a);
        const bId = this.bData.indexOf(b);

        if (aId !== -1 || bId === -1) {
            return false;
        }

        this.aData[bId] = a;
        return true;
    };

    hasA = (a: A) => this.aData.includes(a);

    hasB = (b: B) => this.bData.includes(b);

    getA = (b: B) => {
        const bId = this.bData.indexOf(b);

        if (bId === -1) {
            return;
        }

        return this.aData[bId];
    };

    getB = (a: A) => {
        const aId = this.aData.indexOf(a);

        if (aId === -1) {
            return;
        }

        return this.bData[aId];
    };

    removeA = (a: A) => {
        const aId = this.aData.indexOf(a);

        if (aId === -1) {
            return;
        }

        this.aData.splice(aId, 1);
        this.bData.splice(aId, 1);
    };

    removeB = (b: B) => {
        const bId = this.bData.indexOf(b);

        if (bId === -1) {
            return;
        }

        this.aData.splice(bId, 1);
        this.bData.splice(bId, 1);
    };
}
