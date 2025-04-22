import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Icons, DesignLevels } from '~/bits';
import type { DesignOptionType, FloorLevelType } from '~/models';

type Props = {
    design?: DesignOptionType;
};

export const DesignInfo = observer(({ design }: Props) => (
    <div className="design-info">
        <div className="design-info__top">
            <div className="design-info__desc">
                <p className="design-info__desc-title">
                    {design?.title}
                </p>
                <p className="design-info__desc-text">
                    {design?.inspirationDescription}
                </p>
            </div>
            <div className="design-info__person">
                <div className="design-info__person-desc">
                    <p className="design-info__person-name">
                        {design?.architect?.name}
                    </p>
                    <p className="design-info__person-role">
                        {lang.dict.enum('affiliationType', design?.architect?.role)}
                    </p>
                </div>
                <img
                    src={design?.architect?.avatar?.url}
                    alt=""
                    className="design-info__person-img"
                />
            </div>
        </div>
        <div className="design-info__row">
            <div className="design-info__row-left">
                <div className="design-info__icon">
                    <Icons icon="built-up-area" />
                    <div className="design-info__icon-desc">
                        <p className="design-info__icon-title">
                            {lang.dict.get('builtUpArea')}
                        </p>
                        <p className="design-info__icon-value">
                            {lang.dict.format('squareMetersFormat', [design?.builtUpArea])}
                        </p>
                    </div>
                </div>
                <div className="design-info__icon">
                    <div className="design-info__icon-price">
                        <Icons icon="price" />
                    </div>
                    <div className="design-info__icon-desc">
                        <p className="design-info__icon-title">
                            {lang.dict.get('estimatedConstructionPrice')}
                        </p>
                        <p className="design-info__icon-value">
                            {design?.estimatedConstructionPrice.toLocaleString()}
                            &nbsp;
                            {lang.dict.get('fieldOmr')}
                        </p>
                    </div>
                </div>
            </div>
            <div className="design-info__price">
                <p className="design-info__price-title">{lang.dict.get('designPrice')}</p>
                <p className="design-info__price-total-value">
                    {design?.designPrice} {lang.dict.get('fieldOmr')}
                </p>
            </div>
            <p className="design-info__text">
                {lang.dict.get('requiredLandSize')}&nbsp;
                {lang.dict.format('squareMetersFormat', [design?.requiredLandSize])}
            </p>
            <p className="design-info__text">
                {lang.dict.format('municipalityFeesCost', [design?.municipalityFees])}
            </p>
        </div>
        <DesignLevels levelItems={design?.floorLevels as FloorLevelType[]} />
    </div>
));
