import { observer } from 'mobx-react';
import { PageLayout21 } from '~/partials';
import { hook } from '~/utils';
import { Button, DesignLevels, ErrorList, Icons, If, NoData, SliderMulti, Switch } from '~/bits';
import { LoadingPage } from '../LoadingPage';
import { StartDesign } from './Components';
import { DesignVm } from './Design.vm';
import { stores } from '~/stores';
import { lang } from '~/api';
import type { FloorLevelType } from '~/models';
import { toCurrency } from '~/utils/number';

type Props = {
    vm: DesignVm;
};

type LocationProps = {
    name?: string;
};

const Location = ({ name }: LocationProps) => (
    <div className="project-desc__row">
        <div className="project-desc__icon location">
            <Icons icon="location-gray" />
        </div>
        {name}
    </div>
);

const LeftSide = observer(({ vm }: Props) => (
    <div className="left-content">
        <Switch
            state={() => !vm.hasNoData}
            alt={() => (
                <div className="no-data-container">
                    <NoData forReview={true} />
                </div>
            )}
        >
            <SliderMulti
                list={vm.sliderData}
                onBack={vm.goBack}
                current={vm.sliderCurrent}
                setCurrent={vm.setSliderCurrent}
            />
        </Switch>
    </div>
));

export const Design = observer(() => {
    const vm = hook.useVm(
        () => new DesignVm(),
        [
            stores.display.router.$.design.params,
            stores.display.router.$.project.$.sub.$.design.params,
        ],
    );

    if (vm.isLoading) {
        return <LoadingPage />;
    }

    if (!vm.consultant || !vm.design) {
        vm.goBack();
        return null;
    }

    const title = lang.currentLanguage === 'en' ? vm.design?.titleEn : vm.design?.titleAr;
    const description = lang.currentLanguage === 'en' ? vm.design?.descriptionEn : vm.design?.descriptionAr;
    const type = vm.design?.isDeveloper ? lang.dict.get('developer') : lang.dict.get('architect');
    const features = lang.currentLanguage === 'en' ? vm.design.projectFeatures : vm.design.projectFeaturesAr;

    const projectFeatures = features.map(item => (
        <div
            key={item}
            className="project-features__tick"
        >
            <Icons icon="tick-gray" />
            {item}
        </div>
    ));

    return (
        <PageLayout21 content={<LeftSide vm={vm} />}>
            <section className="details details--design">
                <div
                    className="design-company"
                    data-is-developer={vm.design.isDeveloper}
                >
                    <img
                        src={vm.design?.companyAvatar?.url}
                        alt=""
                        className="design-company__logo"
                    />
                    <div>
                        <p className="design-company__type">
                            {type}
                        </p>
                        <Button
                            color="transparent"
                            value={vm.consultant.nameTranslated}
                            onClick={() => vm.openCompanyProfile(vm.design?.consultantId ?? 0)}
                            hasStopPropagation={true}
                        />
                    </div>
                    <div className="design-company__btn-like" data-liked={vm.design?.liked}>
                        <Button
                            color="transparent"
                            centerImg={vm.design?.liked ? 'like-red' : 'like'}
                            onClick={() => vm.setDesignLiked()}
                            hasStopPropagation={true}
                            value={lang.dict.get('like')}
                        />
                    </div>
                </div>
                <div className="project-desc">
                    <p className="project-desc__title">{title}</p>
                    <div className="project-desc__items">
                        <div className="project-desc__row">
                            <div className="project-desc__icon calendar">
                                <Icons icon="calendar" />
                            </div>
                            {vm.design.delivery}
                        </div>
                    </div>
                    <Switch
                        state={!vm.design.isDeveloper}
                        alt={() => <Location name={vm.design?.locationTranslated} />}
                    >
                        <div className="project-desc__row">
                            <div className="project-desc__icon built">
                                <Icons icon="built-up-area-2" />
                            </div>
                            Min. Land Size - 30m x20m
                        </div>
                    </Switch>
                    <div className="project-desc__row">
                        <div className="project-desc__icon home">
                            <Icons icon="standalone" />
                        </div>
                        {lang.dict.get(vm.design.propertyType)}
                    </div>
                    <p className="project-desc__text">
                        {description}
                    </p>
                </div>
                <div className="project-area">
                    <p className="project-area__title">
                        {lang.dict.get('projectArea')}
                    </p>
                    <div className="project-area__row">
                        <p className="project-area__row-title">
                            {lang.dict.get('landArea')}
                        </p>
                        <p className="project-area__row-value">
                            {lang.dict.format('squareMetersFormat', [vm.design?.requiredLandSize])}
                        </p>
                    </div>
                    <div className="project-area__row">
                        <p className="project-area__row-title">
                            {lang.dict.get('builtUpArea')}
                        </p>
                        <p className="project-area__row-value">
                            {lang.dict.format('squareMetersFormat', [vm.design?.builtUpArea])}
                        </p>
                    </div>
                    <DesignLevels levelItems={vm.design?.floorLevels as FloorLevelType[]} />
                </div>
                <div className="project-features">
                    <div className="project-features__header">
                        <p className="project-features__title">
                            {lang.dict.get('projectFeatures')}
                        </p>
                        <div className="project-features__play">
                            <a
                                href={vm.design.videoLink}
                                target="_blank"
                                className="project-features__play-link"
                            >
                                <div className="icon-play">
                                    <Icons icon="play-blue" />
                                </div>
                            </a>
                            <a
                                href={vm.design.brochureLink}
                                target="_blank"
                                className="project-features__view-link"
                            >
                                {lang.dict.get('viewBrochure')}
                                <div className="icon-next">
                                    <Icons icon="next" />
                                </div>
                            </a>
                        </div>
                    </div>
                    {projectFeatures}
                </div>
                <div className="design-bottom-info">
                    <div className="design-bottom-info__price">
                        <p className="design-card__price-title">
                            {lang.dict.get('propertyPrice')}
                        </p>
                        <p className="design-card__price-value">
                            {toCurrency(vm.design?.estimatedConstructionPrice, 0, 3)} {lang.dict.get('fieldOmr')}
                        </p>
                        <p className="design-card__price-text">
                            {lang.dict.get('landNotIncluded')}
                        </p>
                    </div>
                    <Button
                        color="blue"
                        rightImg="next"
                        value={lang.dict.get('createProject')}
                        onClick={() => vm.openStartDesign()}
                    />
                </div>
            </section>
            <If condition={() => vm.isStartDesign}>
                <StartDesign vm={vm} />
            </If>
            <ErrorList errors={vm.errorListHolder} />
        </PageLayout21>
    );
});
