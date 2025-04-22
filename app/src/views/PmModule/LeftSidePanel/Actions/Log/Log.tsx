import { observer } from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { lang } from '~/api';
import { Loading } from '~/bits';
import type { PmLogType } from '~/models';
import { hook, utilsString } from '~/utils';
import type { LeftSidePanelVm } from '../../LeftSidePanel.vm';
import { LogVm } from './Log.vm';

type Props = {
    parentVm: LeftSidePanelVm;
};

type LogListProps = {
    logList: PmLogType[];
};

const LogList = observer(({ logList }: LogListProps) => {
    const items = logList.map(item => (
        <div
            key={`${item.id}+${item.actorType}`}
            className="pm-logs__item"
        >
            <p className="pm-logs__item-desc">
                {item.description}
            </p>
            <div className="pm-logs__item-row">
                <p className="pm-logs__item-col">
                    {lang.dict.format(
                        'formataActionBy',
                        [utilsString.capitalize(item.actorType)],
                    )}
                </p>
                <p className="pm-logs__item-col pm-logs__item-col--date">
                    {item.date.format('dddd, D MMM YYYY, h:mm A')}
                </p>
            </div>
        </div>
    ));

    return <div className="pm-logs">{items}</div>;
});

export const Log = observer(({ parentVm }: Props) => {
    const vm = hook.useVm(() => new LogVm(parentVm));

    if (!vm.logsList) {
        return null;
    }

    return (
        <InfiniteScroll
            dataLength={vm.logsList.length}
            next={vm.logsList.loadNext}
            hasMore={!vm.logsList.isLast}
            loader={<Loading isEnabled={true} />}
            scrollableTarget="content"
        >
            <LogList logList={vm.logsList.data} />
        </InfiniteScroll>
    );
});
