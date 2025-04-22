import { observer } from 'mobx-react';
import { useState } from 'react';
import { ArchitectListingsVm } from './ArchitectListings.vm';
import { lang } from '~/api';
import { Button, Icons, If, Input, Loading, ProfileCompany, RatingStars } from '~/bits';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Stars, type ArchitectListItemType } from '~/models';
import { toCurrency } from '~/utils/number';

type Props = {
    item: ArchitectListItemType;
};

export const ArchitectListings = observer(() => {
    const [vm] = useState(() => new ArchitectListingsVm());

    const DesignItems = observer(() => {
        const items = vm.listOfDesignServices.map(item => (
            <div key={item.id.asStr()} className="input-group__row">
                <img src={item.iconPath} className="input-group__row-img" />
                <p className="input-group__row-text">{item.name}</p>
            </div>
        ));

        return <> {items} </>;
    });

    const ProductItems = observer(({ item }: Props) => {
        const items = vm.getListOfProductsService(item).map(product => (
            <div key={product.id.asStr()} className="input-group__row">
                <img src={product.iconPath} className="input-group__row-img" />
                <p className="input-group__row-text">{product.name}</p>
            </div>
        ));

        return <>{items}</>;
    });

    const list = vm.architectsList.data.map(item => (
        <div key={item.id} className="architect-item">
            <div className="cell cell--border-bottom cell--border-right cell--company">
                <ProfileCompany
                    name={item.name}
                    stars={{ labels: Stars.starsLabels, values: item.starValues }}
                    avatar={item.avatar?.img}
                    isArchitectListing={true}
                    architectListingEstablishedFormat={lang.dict.format('estabilishedFormat', [item.crStartDate?.format('YYYY')])}
                />
                <div
                    data-liked={false}
                    className="architect-item__btn-like"
                >
                    <Button
                        color="transparent"
                        centerImg="like"
                        onClick={() => { /* TODO */ }}
                        hasStopPropagation={true}
                        value={lang.dict.get('like')}
                    />
                </div>
            </div>
            <div className="cell cell--border-right cell--info-bottom">
                <div className="architect-item__left-info">
                    <div className="architect-item__cell">
                        <p className="architect-item__cell-title">
                            {lang.dict.get('minimumProjectPrice')}
                        </p>
                        <p className="architect-item__cell-value">
                            {toCurrency(item.minProjectPrice, 0, 3)}&nbsp;OMR
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
                    <div className="architect-item__cell">
                        <p className="architect-item__cell-title">
                            {lang.dict.get('engineers')}
                        </p>
                        <p className="architect-item__cell-value">
                            {item.engineers}
                        </p>
                    </div>
                    <div className="architect-item__cell">
                        <p className="architect-item__cell-title">
                            {lang.dict.get('headOffice')}
                        </p>
                        <p className="architect-item__cell-value">
                            {vm.getGovernorateName(item.headOfficeGovernorateId)}
                        </p>
                    </div>
                </div>
                <div className="architect-item__services">
                    <p className="architect-item__services-title">{lang.dict.get('services')}</p>
                    <If condition={item.haveDesignServices}>
                        <div className="architect-item__services-container">
                            <DesignItems />
                            <ProductItems item={item} />
                        </div>
                    </If>
                </div>
            </div>
            <div className="cell cell--btn cell--border-bottom">
                <Button
                    color="white"
                    leftImg="view-projects"
                    onClick={() => vm.openCompanyProfile(item.externalId, true)}
                    value={lang.dict.get('viewProjects')}
                />
            </div>
            <div className="cell cell--btn cell--border-bottom">
                <Button
                    color="white"
                    leftImg="view-profile"
                    onClick={() => vm.openCompanyProfile(item.externalId)}
                    value={lang.dict.get('viewProfile')}
                />
            </div>
            <div className="cell cell--btn">
                <Button
                    color="gray"
                    onClick={() => console.log('disabled')}
                    value="Request Meeting"
                    isDisabled={true}
                />
                <div style={{ marginTop: 10 }}>
                    Coming soon
                </div>
            </div>
        </div>
    ));

    return (
        <div className="architects-listings">
            <div className="architects-listings__top">
                <div className="search">
                    <Input.Text
                        value={vm.name}
                        placeHolder={lang.dict.get('findArchitects')}
                        onChange={vm.changeNameFilter}
                    />
                    <Icons icon="search" />
                </div>
                <div
                    className="architects-listings__btn-like"
                    data-checked={vm.filters.liked}
                    onClick={vm.setLiked}
                >
                    <Button
                        color="white"
                        rightImg={vm.filters.liked ? 'like-red' : 'like'}
                        value={lang.dict.get('myLikes')}
                    />
                    <span className="architects-listings__btn-like-count">
                        ({vm.likedCount})
                    </span>
                </div>
            </div>
            <div className="filter-box">
                <div className="filter-box__fields">
                    <div className="filter-box__field filter-box__field--star">
                        <p className="filter-box__field-title">
                            {lang.dict.get('rating')}
                        </p>
                        <div className="rating-container">
                            <RatingStars
                                values={() => vm.starsList}
                                onChange={vm.setStars}
                                isFlow={true}
                            />
                        </div>
                    </div>
                    <div className="filter-box__field">
                        <p className="filter-box__field-title">
                            {lang.dict.get('designBudget')}
                        </p>
                        <Input.Text
                            value={vm.maxBudget}
                            onChange={vm.changeBudgetFilter}
                            placeHolder={lang.dict.get('maxDesignBudget')}
                        />
                    </div>
                    <div className="filter-box__field">
                        <p className="filter-box__field-title">
                            {lang.dict.get('location')}
                        </p>
                        <Input.Select
                            value={vm.localFilters.governorate}
                            values={vm.governorates}
                            onChange={vm.changeGovernorateFilter}
                        />
                    </div>
                    <div className="filter-box__field filter-box__field--multiple">
                        <p className="filter-box__field-title">
                            {lang.dict.get('services')}
                        </p>
                        <Input.Multiple
                            onChange={vm.setServices}
                            values={vm.allServices}
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
            <p className="architects-listings__title">
                {vm.architectsList.data.length} {lang.dict.get('companies')}
            </p>
            <div className="architects-listings__content">
                <InfiniteScroll
                    dataLength={vm.architectsList.length}
                    next={vm.architectsList.loadNext}
                    hasMore={!vm.architectsList.isLast}
                    loader={<Loading isEnabled={true} />}
                    scrollableTarget="scrolling-page"
                >
                    <div className="architects-listings__table">
                        {list}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
});
