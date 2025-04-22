import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, Close, If, Input, SideModal } from '~/bits';
import { hook } from '~/utils';
import type { PmModuleVm } from '../PmModule.vm';
import { Photos, Log, Docs } from './Actions';
import type { LeftSidePanelVm } from './LeftSidePanel.vm';

type Props = {
    vm: PmModuleVm;
};

type FilterProps = {
    vm: LeftSidePanelVm;
};

const Shortcuts = ({ vm }: Props) => {
    const leftVm = vm.leftPanel;

    return (
        <div className="shortcuts-menu">
            <Button
                color="transparent"
                isCircle={true}
                centerImg="photos-icon"
                onClick={() => leftVm.openSidePanel('pics')}
            />
            <Button
                color="transparent"
                isCircle={true}
                centerImg="docs-icon"
                onClick={() => leftVm.openSidePanel('docs')}
            />
            <Button
                color="transparent"
                isCircle={true}
                centerImg="log-icon"
                onClick={() => leftVm.openSidePanel('logs')}
            />
        </div>
    );
};

const Filter = observer(({ vm }: FilterProps) => {
    if (!vm.isOpenFilter) {
        return null;
    }

    const isPictureTab = vm.activeTab === 'pics';

    const stages = vm.projectStages.map(({ id, order, isChecked }) => ({
        name: () => (
            <label className="filter-list">
                <Input.Checkbox
                    isChecked={isChecked}
                    type="check"
                />
                #{order}
            </label>
        ),
        value: id,
        isVisible: false,
    }));

    return (
        <div className="filter-popup">
            <SideModal onBlur={vm.closeFilter} variant="filter-popup">
                <div className="side-modal__header">
                    <Close onClick={vm.closeFilter} />
                    <p className="side-modal__header-title">
                        {lang.dict.get('filterBy')}
                    </p>
                </div>
                <Input.DateSelect
                    type="date"
                    value={vm.tempUpdateFilter.filter.fromDate}
                    onChange={vm.setFromDate}
                    placeHolder={lang.dict.get('startDate')}
                    name={lang.dict.get('fromDate')}
                />
                <Input.DateSelect
                    type="date"
                    value={vm.tempUpdateFilter.filter.toDate}
                    onChange={vm.setToDate}
                    placeHolder={lang.dict.get('endDate')}
                    name={lang.dict.get('toDate')}
                    min={vm.tempUpdateFilter.filter.fromDate}
                />
                <If condition={isPictureTab}>
                    <Input.Select
                        value={vm.selectedTempStage}
                        values={stages}
                        onChange={vm.setStage}
                        isCheckbox={true}
                        placeHolder={lang.dict.get('stageNumbers')}
                        name={lang.dict.get('stage')}
                    />
                    <Input.Select
                        value={vm.selectedTempActorType}
                        values={vm.actorTypes}
                        onChange={vm.setActorType}
                        isCheckbox={true}
                        placeHolder={lang.dict.get('fieldSelect')}
                        name={lang.dict.get('users')}
                    />
                </If>
                <div className="side-modal__btns">
                    <Button
                        color="transparent"
                        onClick={vm.clearFilter}
                        isDisabled={!vm.isTempFilterActive}
                        value={lang.dict.get('clearAll')}
                    />
                    <Button
                        color="blue"
                        value={lang.dict.get('filter')}
                        onClick={vm.applyUpdateFilter}
                        isDisabled={!vm.isTempFilterActive}
                        rightImg="next"
                    />
                </div>
            </SideModal>
        </div>
    );
});

const Content = observer(({ vm }: Props) => {
    const leftVm = vm.leftPanel;

    const isMobile = hook.useIsMobile();

    return (
        <>
            <div className="full-menu">
                <Filter vm={vm.leftPanel} />
                <div className="full-menu__left">
                    <div
                        className="full-menu__item"
                        data-is-active={leftVm.activeTab === 'pics'}
                    >
                        <Button
                            color="blue"
                            leftImg="photos-icon"
                            onClick={() => leftVm.openSidePanel('pics')}
                            value={lang.dict.get('photos')}
                        />
                    </div>
                    <div
                        className="full-menu__item"
                        data-is-active={leftVm.activeTab === 'docs'}
                    >
                        <Button
                            color="blue"
                            leftImg="docs-icon"
                            onClick={() => leftVm.openSidePanel('docs')}
                            value={lang.dict.get('docs')}
                        />
                    </div>
                    <div
                        className="full-menu__item"
                        data-is-active={leftVm.activeTab === 'logs'}
                    >
                        <Button
                            color="blue"
                            leftImg="log-icon"
                            onClick={() => leftVm.openSidePanel('logs')}
                            value={lang.dict.get('log')}
                        />
                    </div>
                </div>
                <div className="full-menu__right">
                    <div className="filter" data-is-filter={vm.leftPanel.isFilterActive}>
                        <Button
                            color="transparent"
                            centerImg="filter"
                            onClick={vm.leftPanel.openFilter}
                        />
                    </div>
                    <If condition={!isMobile}>
                        <div className="arrow">
                            <Button
                                color="transparent"
                                centerImg="arrow-right"
                                onClick={vm.leftPanel.closeSidePanel}
                            />
                        </div>
                    </If>
                </div>
            </div>
            <div className="content" id="content">
                <If condition={leftVm.activeTab === 'logs'}>
                    <Log parentVm={vm.leftPanel} />
                </If>
                <If condition={leftVm.activeTab === 'pics'}>
                    <Photos parentVm={vm.leftPanel} />
                </If>
                <If condition={leftVm.activeTab === 'docs'}>
                    <Docs parentVm={vm.leftPanel} />
                </If>
            </div>
        </>
    );
});

export const LeftSidePanel = observer((props: Props) => {
    const isMobile = hook.useIsMobile();

    const isOpen = isMobile || props.vm.leftPanel.isOpenSidePanel;

    return (
        <div
            className="left-side-panel"
            data-is-open={isOpen}
        >
            <If condition={isOpen}>
                <Content {...props} />
            </If>
            <If condition={!isOpen}>
                <Shortcuts {...props} />
            </If>
        </div>
    );
});
