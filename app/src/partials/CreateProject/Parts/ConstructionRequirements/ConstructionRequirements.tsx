import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { If } from '~/bits';
import { stores } from '~/stores';
import { hook } from '~/utils';
import { ConstructionRequirementsVm } from './ConstructionRequirements.vm';
import { SowItemsByProjectType } from './SuppliedItems/SowItemsByProjectType';
import { ConstructionRequirementTile as Tile } from './Tile';

export const ConstructionRequirements = observer(() => {
    const vm = hook.useVm(() => new ConstructionRequirementsVm());
    const { draft } = stores.projects;

    return (
        <>
            <div className="tiles">
                <Tile
                    requirement="structureOnly"
                    title={lang.dict.get('constReqStructure')}
                    subtitle={lang.dict.get('constReqStructureSubtitle')}
                    isSelected={draft.constructionType === E.ConstructionType.structureOnly}
                    onSelect={() => draft.setConstructionType(E.ConstructionType.structureOnly)}
                    onOpenPreview={() => vm.openPreview(E.ConstructionType.structureOnly)}
                />
                <Tile
                    requirement="turnKey"
                    title={lang.dict.get('constReqTurnKey')}
                    subtitle={lang.dict.get('constReqTurnKeySubtitle')}
                    isSelected={draft.constructionType === E.ConstructionType.turnKey}
                    onSelect={() => draft.setConstructionType(E.ConstructionType.turnKey)}
                    onOpenPreview={() => vm.openPreview(E.ConstructionType.turnKey)}
                />
            </div>
            <If condition={() => Boolean(vm.preview)} >
                <SowItemsByProjectType
                    type={vm.preview}
                    onClose={vm.closeItemsPreview}
                />
            </If>
        </>
    );
});
