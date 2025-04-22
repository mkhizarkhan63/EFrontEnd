import { observer } from 'mobx-react';
import type { PropsWithChildren } from 'react';
import { E, lang } from '~/api';
import { Close, If, SideModal } from '~/bits/';
import type { SowItem } from '~/models';
import { hook } from '~/utils';
import { SowItemsByProjectTypeVm } from './SowItemsByProjectType.vm';

type Props = {
    vm: SowItemsByProjectTypeVm;
    type?: E.ConstructionType;
    sowId?: number;
    onClose: () => void;
};

type TypeProjectProps = {
    itemSow?: SowItem;
    sowItems?: SowItem[];
    // openModal: (id: number) => void;
};

type SectionProps = PropsWithChildren<{
    title: string;
    layout: 'grid' | 'table';
}>;

const SuppliedItems = observer(({ sowItems }: TypeProjectProps) => {
    const items = sowItems?.map(item => (
        <SuppliedItem
            key={item.id.asNumber()}
            itemSow={item}
            // openModal={openModal}
        />
    ));

    return <>{items}</>;
});

const SuppliedItem = observer(({ itemSow }: TypeProjectProps) => (
    <div
        className="supplied-item"
        // onClick={() => openModal(itemSow?.id.asNumber() ?? 0)}
    >
        <If condition={Boolean(itemSow?.logo)}>
            <img className="supplied-item__img" src={itemSow?.logo?.img?.url} />
        </If>
        <div className="supplied-item__title">
            {itemSow?.sowItemName}
        </div>
    </div>
));

const InstallItems = observer(({ sowItems }: TypeProjectProps) => {
    const items = sowItems?.map(item => (
        <InstallItem
            key={item.id.asNumber()}
            itemSow={item}
            // openModal={openModal}
        />
    ));

    return <>{items}</>;
});

const Section = observer((props: SectionProps) => (
    <div className="section">
        <div className="section__title">
            {props.title}
        </div>
        <div
            className="section__items"
            data-layout={props.layout}
        >
            {props.children}
        </div>
    </div>
));

const InstallItem = observer(({ itemSow }: TypeProjectProps) => (
    <div className="install-item">
        <SuppliedItem
            itemSow={itemSow}
            // openModal={openModal}
        />
        <div
            className="is-installed"
            data-is-installed={itemSow?.installBy}
        >
            {lang.dict.get(itemSow?.installBy ? 'switchYes' : 'switchNo')}
        </div>
    </div>
));

const StructureOnly = observer(({ onClose, vm }: Omit<Props, 'type'>) => (
    <SideModal variant="supplied-items" onBlur={onClose}>
        <div className="side-modal__header">
            <Close onClick={onClose} />
            <div>
                <div className="side-modal__header-title">
                    {lang.dict.get('constReqStructure')}
                </div>
                <div className="side-modal__header-subtitle">
                    {lang.dict.get('suppliedItemsSubtitle')}
                </div>
            </div>
        </div>
        {/* <Switch
            state={!vm.isSowItemUnitModalOpened}
            alt={() => (
                <SowItemUnitModal
                    item={vm.currentSowItem}
                    onClose={vm.closeSowItemUnitsModal}
                />
            )}
        > */}
        <Section
            title={lang.dict.get('suppliedItemsSectionContractor')}
            layout="grid"
        >
            <SuppliedItems
                sowItems={vm.projectItemsData.contractorItems}
                // openModal={vm.openSowItemUnitsModal}
            />
        </Section>
        <Section
            title={lang.dict.get('suppliedItemsSectionClient')}
            layout="table"
        >
            <div className="section__subtitle">
                <span>
                    {lang.dict.get('suppliedItemsSectionClientSubtitleL')}
                </span>
                <span>
                    {lang.dict.get('suppliedItemsSectionClientSubtitleR')}
                </span>
            </div>
            <InstallItems
                sowItems={vm.projectItemsData.clientItems}
                // openModal={vm.openSowItemUnitsModal}
            />
        </Section>
        {/* </Switch> */}
    </SideModal>
));

const TurnKey = observer(({ onClose, vm }: Omit<Props, 'type'>) => (
    <SideModal variant="supplied-items" onBlur={onClose}>
        <div className="side-modal__header">
            <Close onClick={onClose} />
            <div>
                <div className="side-modal__header-title">
                    {lang.dict.get('constReqTurnKey')}
                </div>
                <div className="side-modal__header-subtitle">
                    {lang.dict.get('suppliedItemsSubtitle')}
                </div>
            </div>
        </div>
        {/* <Switch
            state={!vm.isSowItemUnitModalOpened}
            alt={() => (
                <SowItemUnitModal
                    item={vm.currentSowItem}
                    onClose={vm.closeSowItemUnitsModal}
                />
            )}
        > */}
        <Section
            title={lang.dict.get('suppliedItemsSectionContractor')}
            layout="grid"
        >
            <SuppliedItems
                sowItems={vm.projectItemsData.contractorItems}
                // openModal={vm.openSowItemUnitsModal}
            />
        </Section>
        <Section
            title={lang.dict.get('suppliedItemsSectionClient')}
            layout="table"
        >
            <div className="section__subtitle">
                <span>
                    {lang.dict.get('suppliedItemsSectionClientSubtitleL')}
                </span>
                <span>
                    {lang.dict.get('suppliedItemsSectionClientSubtitleR')}
                </span>
            </div>
            <InstallItems
                sowItems={vm.projectItemsData.clientItems}
                // openModal={vm.openSowItemUnitsModal}
            />
        </Section>
        {/* </Switch> */}
    </SideModal>
));

export const SowItemsByProjectType = observer(({ type, onClose, sowId }: Omit<Props, 'vm'>) => {
    if (!type) {
        return null;
    }

    const vm = hook.useVm(() => new SowItemsByProjectTypeVm(type, sowId), [type]);

    return type === E.ConstructionType.structureOnly
        ? <StructureOnly onClose={onClose} vm={vm} />
        : <TurnKey onClose={onClose} vm={vm} />;
});
