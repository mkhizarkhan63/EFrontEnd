import { action, runInAction } from 'mobx';
import moment from 'moment';
import { E, Id, lang, LazyDataList, restQuery } from '~/api';
import { stores } from '~/stores';
import { confirmPrompt } from '~/utils';

export class Sow {
    id = Id.init();

    contractName = '';

    status = E.SowAndStageStatus.drafted;

    usedFrom = moment();

    usedTo = moment();

    createdOn = moment();

    numberOfItems = 0;

    sowItemList = new LazyDataList(
        'Sow Items',
        () => restQuery.sow.getSowItems(this.id),
        restQuery.sow.getSowItem,
        true,
        () => [this.id.asStr()],
    );

    constructor() {
        makeSafeObservable(this, {
            moveItem: action,
            setName: action,
            remove: action,
        });
    }

    get sowItems() {
        return this.sowItemList.data;
    }

    get isMasterSow() {
        return this.status === E.SowAndStageStatus.live;
    }

    get isEditable() {
        return (
            this.status !== E.SowAndStageStatus.inactive && !this.isMasterSow
        );
    }

    setName = (name: string) => {
        this.contractName = name;
    };

    moveItem = (a: number, b: number) => {
        const items = Array.from(this.sowItems);
        const item = items.splice(a, 1).find(() => true);

        if (!item) {
            return;
        }

        items.splice(b, 0, item);
        this.sowItemList.set(
            items.map((el, i) => {
                el.orderNumber = i + 1;
                return el;
            }),
        );
    };

    remove = (sowId: Id) => {
        confirmPrompt(lang.dict.get('removeSowDraftPrompt'), async () => {
            const result = await stores.sows.deleteSow(sowId);

            if (!result) {
                return;
            }

            runInAction(() => {
                stores.sows.sows.removeId(sowId);
            });
        });
    };
}
