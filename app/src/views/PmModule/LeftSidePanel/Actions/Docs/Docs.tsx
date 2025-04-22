import { observer } from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { lang } from '~/api';
import { Button, If, Input, Loading } from '~/bits';
import type { FileDataType, LogUpdateItemType } from '~/models';
import { downloadAll } from '~/utils';
import type { LeftSidePanelVm } from '../../LeftSidePanel.vm';

type Props = {
    parentVm: LeftSidePanelVm;
};

type DocsListProps = {
    docs: LogUpdateItemType[];
    vm: LeftSidePanelVm;
};

export const DocsList = observer(({ docs, vm }: DocsListProps) => {
    const items = docs.map(item => (
        <div
            key={`${item.id}+${item.fileName}`}
            className="pm-docs__item"
        >
            <Input.Checkbox
                type="check"
                isChecked={item.isChecked}
                onChange={e => item.setChecked(e)}
                name={item.fileName}
                customClick={() => item.openDocument()}
            />
            <div className="pm-docs__item-update">
                <div className="pm-docs__item-update-col">
                    {lang.dict.get('updateId')}&nbsp;
                    <span className="pm-docs__item-update-value" onClick={() => vm.parentVm.redirectToUpdate(item.id)}>PD-{item.id}</span>
                </div>
                <p className="pm-docs__item-update-date">
                    {item.postedAt?.format('dddd, D MMM YYYY, h:mm A')}
                </p>
            </div>
        </div>
    ));

    return <>{items}</>;
});

export const Docs = observer(({ parentVm }: Props) => {
    if (!parentVm.updates) {
        return null;
    }

    return (
        <div className="pm-docs">
            <InfiniteScroll
                dataLength={parentVm.updates.length}
                next={parentVm.updates.loadNext}
                hasMore={!parentVm.updates.isLast}
                loader={<Loading isEnabled={true} />}
                scrollableTarget="content"
            >
                <If condition={parentVm.isPicsDocuments}>
                    <div className="pm-docs__btn">
                        <Button
                            color="white"
                            value={lang.dict.get('download')}
                            leftImg="download"
                            onClick={downloadAll(parentVm.selectedDocs as FileDataType[])}
                        />
                    </div>
                </If>
                <DocsList docs={parentVm.updates.data} vm={parentVm} />
            </InfiniteScroll>
        </div>
    );
});
