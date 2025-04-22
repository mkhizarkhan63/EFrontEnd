import { observer } from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { lang } from '~/api';
import { DesignOptionCard, Loading } from '~/bits';
import type { StartDesignVm } from '../../StartDesign.vm';

type Props = {
    vm: StartDesignVm;
};

export const DesignList = observer(({ vm }: Props) => {
    const items = vm.designList.data.map(item => (
        <DesignOptionCard
            key={item.id}
            item={item}
            openDesign={vm.openDesign}
            onLike={vm.setCardLiked}
            openCompanyProfile={vm.openCompanyProfile}
        />
    ));

    return (
        <div className="design-list">
            <h1 className="design-list__header">
                {vm.listCount}
                &nbsp;
                {lang.dict.get('listings')}
            </h1>
            <div className="design-list__content">
                <InfiniteScroll
                    dataLength={vm.designList.length}
                    next={vm.designList.loadNext}
                    hasMore={!vm.designList.isLast}
                    loader={<Loading isEnabled={true} />}
                    scrollableTarget="scrolling-page"
                >
                    {items}
                </InfiniteScroll>
            </div>
        </div>
    );
});
