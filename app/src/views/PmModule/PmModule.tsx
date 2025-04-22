import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, If, Loading, Menu, Switch } from '~/bits';
import {
    Materials,
    PageWithDoubleSidebar,
    Payments,
    Tasks,
    Updates,
} from '~/partials';
import { hook } from '~/utils';
import { LeftSidePanel } from './LeftSidePanel';
import { PmModuleVm } from './PmModule.vm';
import { RightSidePanel } from './RightSidePanel';
import { TaskActionModal } from './TaskActionModal';
import { UpdateGallery } from './UpdateGallery';
import { AddObservation } from './AddObservation';
import { Invoice } from '~/partials/PmModuleManagement/Payments/Components/ConsultantPayments/Invoice';

type Props = {
    projectId: number;
};

const createViewMap = (vm: PmModuleVm, projectId: number) => {
    switch (vm.currentPage) {
        case E.PmModuleMenu.tasks:
            return () => <Tasks vm={vm} />;
        case E.PmModuleMenu.payments:
            return () => <Payments parentVm={vm} />;
        case E.PmModuleMenu.materials:
            return () => <Materials projectId={projectId} startDate={vm.project?.startDate} parentVm={vm} />;
        case E.PmModuleMenu.updates:
            return () => <Updates projectId={projectId} parentVm={vm} />;
        default:
            return null;
    }
};

export const PmModule = observer(({ projectId }: Props) => {
    const vm = hook.useVm(() => new PmModuleVm(projectId), [projectId]);

    const isMobile = hook.useIsMobile();

    const Component = createViewMap(vm, projectId);

    if (!vm.currentPage || Component === null) {
        vm.goBack();

        return <Loading isEnabled={true} />;
    }

    const mobileMenu = (
        <div className="pm-module-view__mobile-menu">
            <div
                className="pm-module-view__mobile-menu-item"
                data-is-active={vm.activeTab === 'dashboard'}
            >
                <Button
                    color="blue"
                    leftImg="dashboard"
                    onClick={() => vm.setActiveTab('dashboard')}
                    value={lang.dict.get('mobileDashboard')}
                />
            </div>
            <div
                className="pm-module-view__mobile-menu-item"
                data-is-active={vm.activeTab === 'logs'}
            >
                <Button
                    color="blue"
                    leftImg="log-icon"
                    onClick={() => vm.setActiveTab('logs')}
                    value={lang.dict.get('logs')}
                />
            </div>
            <div
                className="pm-module-view__mobile-menu-item"
                data-is-active={vm.activeTab === 'tools'}
            >
                <Button
                    color="blue"
                    leftImg="tools-icon"
                    onClick={() => vm.setActiveTab('tools')}
                    value={lang.dict.get('tools')}
                />
            </div>
        </div>
    );

    return (
        <Switch
            state={!vm.isLoading}
            alt={() => <Loading isEnabled={true} />}
        >
            <div className="pm-module-view" data-active-tab={vm.activeTab}>
                <PageWithDoubleSidebar
                    leftPanel={() => <LeftSidePanel vm={vm} />}
                    rightPanel={() => <RightSidePanel vm={vm} />}
                >
                    <Menu
                        getItems={() => vm.menuItems}
                        isActive={vm.isMenuItemActive}
                        isAnimated={true}
                        // isPmIndicator={true}
                    />
                    <div className="pm-module-view__content">
                        <Component />
                    </div>
                    <TaskActionModal parentVm={() => vm} />
                    <Invoice parentVm={() => vm} />
                    <If condition={() => vm.isGalleryOpened}>
                        <UpdateGallery
                            item={() => vm.currentUpdateItemForGallery}
                            attachments={() => vm.leftPanel.updates.data}
                            current={() => vm.currentGalleryIndex}
                            loadNext={vm.leftPanel.updates.loadNext}
                            changed={() => vm.idChanged}
                            onClose={vm.closeGallery}
                            fileId={vm.currentGalleryFile}
                            onRedirect={vm.redirectToUpdate}
                        />
                    </If>
                    <If condition={() => vm.isAddObservationOpened}>
                        <AddObservation vm={vm} />
                    </If>
                </PageWithDoubleSidebar>
                <If condition={isMobile}>
                    {mobileMenu}
                </If>
            </div>
        </Switch>
    );
});
