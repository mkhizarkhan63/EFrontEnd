import { lang } from '~/api';
import type { StartDesignVm } from '../../StartDesign.vm';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button, Hide, Icons, Input, Loading } from '~/bits';
import { observer } from 'mobx-react';

type Props = {
    vm: StartDesignVm;
};

export const ArchitectList = observer(({ vm }: Props) => {
    const list = vm.architectsList.data.map(item => (
        <div key={item.id} className="architect-item">
            <div className="architect-item__company">
                <img
                    src={item.avatar?.img?.url}
                    alt="logo"
                    className="architect-item__company-logo"
                />
                {item.name}
            </div>
            <div className="architect-item__cell">
                <p className="architect-item__cell-title">
                    {lang.dict.get('headOffice')}
                </p>
                <p className="architect-item__cell-value">
                    {vm.getGovernorateName(item.headOfficeGovernorateId)}
                </p>
            </div>
            <div className="architect-item__cell architect-item__cell--established">
                <p className="architect-item__cell-title">
                    {lang.dict.get('estabilished')}
                </p>
                <p className="architect-item__cell-value">
                    {item.crStartDate?.format('YYYY')}
                </p>
            </div>
            <div className="architect-item__cell">
                <p className="architect-item__cell-title">
                    {lang.dict.get('completedProjects')}
                </p>
                <p className="architect-item__cell-value">
                    {item.completedProjects}
                </p>
            </div>
            <div className="architect-item__cell architect-item__cell--engineers">
                <p className="architect-item__cell-title">
                    {lang.dict.get('engineers')}
                </p>
                <p className="architect-item__cell-value">
                    {item.engineers}
                </p>
            </div>
            <Hide reason="moved-to-phase-2">
                <div className="architect-item__cell architect-item__cell--like" data-liked={true}>
                    <Button
                        color="transparent"
                        isCircle={true}
                        centerImg="like-red"
                        onClick={() => { /* TODO */ }}
                        hasStopPropagation={true}
                    />
                </div>
            </Hide>
            <div className="architect-item__cell architect-item__cell--view">
                <Button
                    color="white"
                    onClick={() => vm.openCompanyProfile(item.externalId)}
                    value={lang.dict.get('viewProfile')}
                />
            </div>
        </div>
    ));

    return (
        <div className="architects-list">
            <Hide reason="moved-to-phase-2">
                <div className="architects-list__top">
                    <div className="search">
                        <Input.Text
                            value=""
                            placeHolder={lang.dict.get('findArchitects')}
                            onChange={() => { /* TODO */ }}
                        />
                        <Icons icon="search" />
                    </div>
                    <div
                        className="architects-list__btn-like"
                        data-checked={vm.filters.liked}
                        onClick={vm.setLiked}
                    >
                        <Button
                            color="white"
                            rightImg={vm.filters.liked ? 'like-red' : 'like'}
                            value={lang.dict.get('myLikes')}
                        />
                        <span className="architects-list__btn-like-count">
                            ({vm.likedCount})
                        </span>
                    </div>
                </div>
            </Hide>
            <div className="architects-list__content">
                <InfiniteScroll
                    dataLength={vm.architectsList.length}
                    next={vm.architectsList.loadNext}
                    hasMore={!vm.architectsList.isLast}
                    loader={<Loading isEnabled={true} />}
                    scrollableTarget="scrolling-page"
                >
                    <div className="architects-list__table">
                        {list}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
});
