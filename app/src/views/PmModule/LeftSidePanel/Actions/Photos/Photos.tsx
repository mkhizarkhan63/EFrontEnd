import { observer } from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { E, lang } from '~/api';
import { Loading } from '~/bits';
import type { LogUpdateItemType } from '~/models';
import { utilsString } from '~/utils';
import type { LeftSidePanelVm } from '../../LeftSidePanel.vm';

type Props = {
    parentVm: LeftSidePanelVm;
};

type DocsListProps = {
    photos: LogUpdateItemType[];
    openGallery: (id: number) => void;
};

export const PhotoList = observer(({ photos, openGallery }: DocsListProps) => {
    const items = photos.map((item, index) => {
        const postedBy = item.posterActorType === E.WorkflowActorType.none
            ? lang.dict.get('system')
            : item.posterActorType;

        const name = item.posterActor.name === 'Unknown' ? '' : item.posterActor.name;

        return (
            <div
                key={`${item.id}+${item.fileName}`}
                className="pm-photos__item"
            >
                <img
                    className="pm-photos__item-img"
                    src={item.picture?.url}
                    alt={item.fileName}
                    onClick={() => openGallery(index)}
                />
                <div className="pm-photos__item-desc">
                    <div className="pm-photos__item-col">
                        <p className="pm-photos__item-type">
                            {
                                lang.dict.format(
                                    'formatPostedBy',
                                    [utilsString.capitalize(postedBy)])
                            }
                        </p>
                        <span className="pm-photos__item-name">
                            {name}
                        </span>
                    </div>
                    <p className="pm-photos__item-date">
                        {item.postedAt?.format('dddd, D MMM YYYY, h:mm A')}
                    </p>
                </div>
            </div>
        );
    });

    return <div className="pm-photos">{items}</div>;
});

export const Photos = observer(({ parentVm }: Props) => {
    if (!parentVm.updates) {
        return null;
    }

    return (
        <InfiniteScroll
            dataLength={parentVm.updates.length}
            next={parentVm.updates.loadNext}
            hasMore={!parentVm.updates.isLast}
            loader={<Loading isEnabled={true} />}
            scrollableTarget="content"
        >
            <PhotoList
                photos={parentVm.updates.data}
                openGallery={parentVm.openGallery}
            />
        </InfiniteScroll>
    );
});
