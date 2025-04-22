import { observer, useLocalObservable } from 'mobx-react';
import { lang } from '~/api';
import { Button, Icons, SliderForDesign, Switch } from '~/bits';
import type { DesignOptionType } from '~/models';
import { toCurrency } from '~/utils/number';

type Props = {
    item: DesignOptionType;
    openDesign: (id?: number) => void;
    openCompanyProfile: (id: number) => void;
    onLike: (item: DesignOptionType) => void;
    isDeveloper?: boolean;
};

type LocationProps = {
    name: string;
};

export const DesignOptionCard = observer((props: Props) => {
    const { item, openDesign, openCompanyProfile, onLike, isDeveloper } = props;

    const state = useLocalObservable(() => ({
        showLevels: false,
        toggleShowLevels: () => {
            state.showLevels = !state.showLevels;
        },
    }));

    const Location = ({ name }: LocationProps) => (
        <div className="design-card__col">
            <div className="design-card__icon location">
                <Icons icon="location-gray" />
            </div>
            {name}
        </div>
    );

    const type = isDeveloper ? lang.dict.get('developer') : lang.dict.get('architect');

    const land = isDeveloper ? lang.dict.format('landIncludedFormat', [item.requiredLandSize]) : lang.dict.get('landNotIncluded');

    return (
        <div
            className="design-card"
            onClick={() => openDesign(item.externalId)}
        >
            <SliderForDesign list={item.sliderImgs} />
            <div className="design-card__right" data-is-developer={isDeveloper}>
                <div className="design-card__company">
                    <img src={item.companyAvatar?.url} alt="" className="design-card__company-logo" />
                    <div>
                        <p className="design-card__company-type">
                            {type}
                        </p>
                        <Button
                            color="transparent"
                            value={item.companyName}
                            onClick={() => openCompanyProfile(item.consultantId)}
                            hasStopPropagation={true}
                        />
                    </div>
                </div>
                <div className="design-card__project-info">
                    <p className="design-card__project-info-title">
                        {item.title}
                    </p>
                    <div className="design-card__project-info-items">
                        <div className="design-card__col">
                            <div className="design-card__icon calendar">
                                <Icons icon="calendar" />
                            </div>
                            {item.delivery}
                        </div>
                        <Switch
                            state={!isDeveloper}
                            alt={() => <Location name={item.locationTranslated} />}
                        >
                            <div className="design-card__col">
                                <div className="design-card__icon built">
                                    <Icons icon="built-up-area-2" />
                                </div>
                                Min. Land Size - 30m x20m
                            </div>
                        </Switch>
                        <div className="design-card__col">
                            <div className="design-card__icon home">
                                <Icons icon="standalone" />
                            </div>
                            {lang.dict.get(item.propertyType)}
                        </div>
                        <div className="design-card__col">
                            <div className="design-card__icon">
                                <Icons icon="bedroom" />
                            </div>
                            {item.bedrooms} {lang.dict.get('beds')}
                        </div>
                        <div className="design-card__col">
                            <div className="design-card__icon built">
                                <Icons icon="built-up-area-2" />
                            </div>
                            {lang.dict.get('builtUpArea')} -
                            &nbsp;{lang.dict.format('squareMetersFormat', [item.builtUpArea])}
                        </div>
                    </div>
                </div>
                <div className="design-card__price">
                    <p className="design-card__price-title">
                        {lang.dict.get('propertyPrice')}
                    </p>
                    <p className="design-card__price-value">
                        {toCurrency(item.estimatedConstructionPrice, 0, 3)} {lang.dict.get('fieldOmr')}
                    </p>
                    <p className="design-card__price-text">
                        {land}
                    </p>
                </div>
                <div className="design-card__bottom">
                    <div
                        className="design-card__btn-like"
                        data-liked={item.liked}
                    >
                        <Button
                            color="transparent"
                            centerImg={item.liked ? 'like-red' : 'like'}
                            onClick={() => onLike(item)}
                            hasStopPropagation={true}
                            value={lang.dict.get('like')}
                        />
                    </div>
                    <Button
                        color="white"
                        rightImg="next"
                        onClick={() => openDesign(item.externalId)}
                        value={lang.dict.get('viewMore')}
                    />
                </div>
            </div>
        </div>
    );
});
