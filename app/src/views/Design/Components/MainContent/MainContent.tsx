import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, DesignInfo, DesignOptionCard, If } from '~/bits';
import type { DesignVm } from '../../Design.vm';

type Props = {
    vm: DesignVm;
};

export const MainContent = observer(({ vm }: Props) => {
    const designItems = vm.relatedDesigns.map(item => (
        <DesignOptionCard
            item={item}
            openDesign={() => vm.openDesign(item.externalId)}
            openCompanyProfile={() => vm.openCompanyProfile(item.consultantId)}
            key={String(item.id)}
            onLike={vm.setCardLiked}
        />
    ));

    return (
        <div className="design-detail-main">
            <h1 className="design-detail-main__quote">&quot;{vm.design?.description}&quot;</h1>
            <DesignInfo design={vm.design} />
            <div className="start-design-box">
                <p className="start-design-box__header">{lang.dict.get('itsNeverBeenSimpler')}</p>
                <p className="start-design-box__subheader">{lang.dict.get('theFastestWay')}</p>
                <If condition={() => vm.hasProject}>
                    <Button
                        value={lang.dict.get('startDesign')}
                        color="green"
                        rightImg="next"
                        onClick={vm.openStartDesign}
                    />
                </If>
            </div>
            <If condition={() => vm.relatedDesigns.length > 0}>
                <p className="design-detail-main__title">
                    {lang.dict.get('relatedProperties')}
                </p>
            </If>
            <div className="design-detail-main__list">
                {designItems}
            </div>
        </div>
    );
});
