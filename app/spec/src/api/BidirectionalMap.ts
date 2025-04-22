import { BidirectionalMap } from '~/api';
import { describe, expect, it } from '~cypress';

describe('api/BidirectionalMap', () => {
    it('setA/B', () => {
        const bidMap = new BidirectionalMap<number, number>();

        bidMap.set(1, 1);
        bidMap.set(2, 2);
        bidMap.set(3, 3);

        expect(bidMap.setB(3, 4), 'setB(3, 4)').to.be.eq(true);
        expect(bidMap.getB(3), 'getB(4)').to.be.eq(4);
    });

    it('hasA/B', () => {
        const bidMap = new BidirectionalMap<number, number>();

        bidMap.set(1, 1);

        expect(bidMap.hasA(1), 'hasA(1)').to.be.eq(true);
        expect(bidMap.hasA(2), 'hasA(2)').to.be.eq(false);
        expect(bidMap.hasB(1), 'hasB(1)').to.be.eq(true);
        expect(bidMap.hasB(2), 'hasB(2)').to.be.eq(false);
    });

    it('getA/B', () => {
        const bidMap = new BidirectionalMap<number, number>();

        bidMap.set(1, 2);
        bidMap.set(2, 1);

        expect(bidMap.getA(1), 'getA(1)').to.be.eq(2);
        expect(bidMap.getA(2), 'getA(2)').to.be.eq(1);
        expect(bidMap.getB(1), 'getB(1)').to.be.eq(2);
        expect(bidMap.getB(2), 'getB(2)').to.be.eq(1);
    });

    it('removeA/B', () => {
        const bidMap = new BidirectionalMap<number, number>();

        bidMap.set(1, 2);
        bidMap.set(2, 1);
        bidMap.set(3, 3);

        bidMap.removeA(2);
        bidMap.removeB(3);

        expect(bidMap.getA(1), 'getA(1)').to.be.eq(undefined);
        expect(bidMap.getB(3), 'getB(3)').to.be.eq(undefined);
        expect(bidMap.getA(2), 'getA(2)').to.be.eq(1);
    });
});
