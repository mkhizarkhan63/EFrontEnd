import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { If, Button } from '~/bits';
import { utilsNumber } from '~/utils';
import type { BidingVm } from '../Biding.vm';

type Props = {
    vm: BidingVm;
    isSummary?: boolean;
};

export const Price = observer(({ vm, isSummary }: Props) => {
    const { bid } = vm.project.forContractor;

    if (!bid) {
        return null;
    }

    return (
        <div className="project-right__item">
            <div className="project-right__item-header">
                <p className="project__title">{lang.dict.get('price')}</p>
                <If condition={Boolean(isSummary)}>
                    <Button
                        color="transparent"
                        value={lang.dict.get('viewCosts')}
                        onClick={vm.toggleIsViewCosts}
                    />
                </If>
            </div>
            <div className="project-right__item-row">
                <p className="project-right__item-title">
                    {lang.dict.get('structureProjectPrice')}
                </p>
                <span>
                    {utilsNumber.toCurrency(bid.structureOnly?.totalPrice)} {lang.dict.get('fieldOmr')}
                </span>
            </div>
            <If condition={() => vm.project.constructionType === E.ConstructionType.turnKey}>
                <div className="project-right__item-row project-right__item-row--last">
                    <p className="project-right__item-title">
                        {lang.dict.get('turnKeyItems')}
                    </p>
                    <span>
                        {utilsNumber.toCurrency(bid.turnkeyPrice)} {lang.dict.get('fieldOmr')}
                    </span>
                </div>
            </If>
            <div className="project-right__item-row project-right__item-row--total">
                <p className="project-right__item-title">
                    {lang.dict.get('totalPrice')}
                </p>
                <span>
                    {utilsNumber.toCurrency(bid.totalBidPrice)} {lang.dict.get('fieldOmr')}
                </span>
            </div>
        </div>
    );
});
