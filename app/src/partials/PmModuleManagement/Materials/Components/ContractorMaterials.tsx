import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, HeaderSwitch } from '~/bits';
import type { MaterialsVm } from '../Materials.vm';
import { useState } from 'react';

export type ContractorMaterialsProps = {
    type: 'contractorMaterials';
    parentVm: MaterialsVm;
};

export const ContractorMaterials = observer(({ parentVm }: ContractorMaterialsProps) => {
    if (!parentVm.pmMaterial?.contractor) {
        return null;
    }

    const [isCollapsed, setIsCollapsed] = useState(true);

    const {
        pmMaterial: { contractor },
        openSowItemModal,
    } = parentVm;

    const header = (
        <div className="materials-header">
            <p className="materials-header__title">
                {lang.dict.enum('materialType', E.MaterialType.contractorMaterials)}
            </p>
        </div>
    );

    const description = (
        <p className="materials-desc">
            {contractor.length} {lang.dict.get('items')}
        </p>
    );

    const materials = contractor.map(item => (
        <div
            key={item.id}
            onClick={() => openSowItemModal(item.externalId)}
            className="materials-images__item"
        >
            <div
                className="materials-images__item-img-container"
                data-is-empty={false}
            >
                <img
                    src={item.icon?.url}
                    className="materials-images__item-img"
                    alt=""
                />
            </div>
            <Button
                color="transparent"
                onClick={() => openSowItemModal(item.externalId)}
                value={lang.currentLanguage === 'en' ? item.englishName : item.arabicName}
            />
        </div>
    ));

    return (
        <div className="contractor-materials">
            <HeaderSwitch
                id={1}
                header={header}
                description={description}
                isCollapsed={isCollapsed}
                setCollapsed={() => setIsCollapsed(prev => !prev)}
                border="orange"
            >
                <div className="materials-images">
                    {materials}
                </div>
            </HeaderSwitch>
        </div>
    );
});
