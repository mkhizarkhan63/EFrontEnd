import { observer } from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { lang } from '~/api';
import { Button, DesignOptionCard, Icons, Input, InputCounter, Loading } from '~/bits';
import { DesignListingsVm } from './DesignListings.vm';
import { useState } from 'react';
import { ConsultantType } from '~/api/Enums';

export const DesignListings = observer(() => {
    const [vm] = useState(() => new DesignListingsVm());

    const items = vm.designList.data.map(item => (
        <DesignOptionCard
            key={item.id}
            item={item}
            openDesign={vm.openDesign}
            onLike={vm.setCardLiked}
            openCompanyProfile={vm.openCompanyProfile}
            isDeveloper={item.consultantType === ConsultantType.developer}
        />
    ));

    return (
        <div className="design-listings">
            <div className="design-listings__top">
                <div className="search">
                    <Input.Text
                        value={vm.name}
                        placeHolder={lang.dict.get('findDesigns')}
                        onChange={vm.changeNameFilter}
                    />
                    <Icons icon="search" />
                </div>
                <div
                    className="design-listings__btn-like"
                    data-checked={vm.filters.liked}
                    onClick={vm.setLiked}
                >
                    <Button
                        color="white"
                        rightImg={vm.filters.liked ? 'like-red' : 'like'}
                        value={lang.dict.get('myLikes')}
                    />
                    <span className="design-listings__btn-like-count">
                        ({vm.likedCount})
                    </span>
                </div>
            </div>
            <div className="filter-box">
                <div className="filter-box__fields">
                    <div className="filter-box__field">
                        <p className="filter-box__field-title">
                            {lang.dict.get('propertyPrice')}
                        </p>
                        <Input.Text
                            value={vm.price}
                            onChange={vm.changePriceFilter}
                            placeHolder={lang.dict.get('maxPropertyPrice')}
                        />
                    </div>
                    <div className="filter-box__field">
                        <p className="filter-box__field-title">
                            {lang.dict.get('buildingType')}
                        </p>
                        <Input.Select
                            value={vm.localFilters.propertyType}
                            values={vm.projectTypeValues}
                            onChange={vm.changePropertyTypeFilter}
                        />
                    </div>
                    <div className="filter-box__field">
                        <p className="filter-box__field-title">
                            {lang.dict.get('bedroomsNumber')}
                        </p>
                        <InputCounter
                            value={vm.localFilters.bedrooms}
                            onChange={vm.changeBedroomsFilter}
                        />
                    </div>
                    <div className="filter-box__field">
                        <p className="filter-box__field-title">
                            {lang.dict.get('buildup')}
                        </p>
                        <Input.Text
                            value={vm.buildUpArea}
                            onChange={vm.changeBuildUpAreaFilter}
                            placeHolder={lang.dict.get('maxAreaOfHome')}
                        />
                    </div>
                    <div className="filter-box__btns">
                        <Button
                            color="transparent"
                            onClick={vm.clearFilters}
                            value={lang.dict.get('clearAll')}
                        />
                        <Button
                            color="blue"
                            value={lang.dict.get('filter')}
                            onClick={vm.submitFilters}
                            isDisabled={false}
                            rightImg="next"
                        />
                    </div>
                </div>
            </div>
            <p className="design-listings__title">
                {vm.listCount} {lang.dict.get('projects')}
            </p>
            <div className="design-listings__content">
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
