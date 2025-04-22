import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, If, Switch } from '~/bits';
import type { Project } from '~/models';
import { PageWithWizard } from '~/partials';
import { hook } from '~/utils';
import { ProjectDetailsVm } from './ProjectDetails.vm';
import {
    Archived,
    Bids,
    Contract,
    ContractorsBid,
    InviteContractor,
    Live,
    Rejected,
    ReviewingState,
} from './ProjectStepBiding';
import { ProjectStatus } from './ProjectStatus';

type Props = {
    project: Project;
};

type ViewMapProps = {
    vm: ProjectDetailsVm;
};

const createViewMap = ({ vm }: ViewMapProps) => {
    switch (vm.project.projectStatus) {
        case E.ProjectStatus.rejected:
            return () => <Rejected vm={vm} />;
        case E.ProjectStatus.archived:
            return () => <Archived />;
        case E.ProjectStatus.reviewing:
            return () => <ReviewingState onClick={vm.openStatusModal} />;
        case E.ProjectStatus.openBids:
            if (vm.isBidsPreviewed) {
                return () => <Bids vm={vm} isPreviewed={true} />;
            }
            return () => <ContractorsBid vm={vm} />;
        case E.ProjectStatus.chooseContractor:
            return () => <Bids vm={vm} />;
        case E.ProjectStatus.readyToSign:
            return () => <Contract vm={vm} />;
        case E.ProjectStatus.liveInPm:
            return () => <Live goContract={vm.goToContract} />;
        default:
            return () => null;
    }
};

const steps = (vm: ProjectDetailsVm) => {
    const projectStatuses = [
        E.ProjectStatus.reviewing,
        E.ProjectStatus.archived,
        E.ProjectStatus.rejected,
        E.ProjectStatus.openBids,
        E.ProjectStatus.chooseContractor,
        E.ProjectStatus.readyToSign,
        E.ProjectStatus.signed,
        E.ProjectStatus.liveInPm,
    ];

    const currentStatusNum = projectStatuses.findIndex(x => x === vm.project.projectStatus);

    const getRelativeStatus = (status: E.ProjectStatus[]) => {
        const indexes = status.map(s => projectStatuses.findIndex(x => x === s));

        if (indexes.includes(currentStatusNum)) {
            return vm.project.projectStatus === E.ProjectStatus.rejected
                ? E.ProcessWizard.rejected
                : E.ProcessWizard.inProgress;
        }

        if (indexes.every(x => x > currentStatusNum)) {
            return E.ProcessWizard.wait;
        }

        return E.ProcessWizard.done;
    };

    return {
        steps: [
            {
                status: getRelativeStatus(
                    [
                        E.ProjectStatus.rejected,
                        E.ProjectStatus.reviewing,
                        E.ProjectStatus.archived,
                    ],
                ),
                name: lang.dict.get('projectRequirements'),
                component: () => (
                    <Button
                        value={lang.dict.get('viewDetail')}
                        color="transparent"
                        onClick={vm.openStatusModal}
                    />
                ),
                flex: 1.05,
            },
            {
                status: getRelativeStatus(
                    [
                        E.ProjectStatus.chooseContractor,
                        E.ProjectStatus.openBids,
                    ],
                ),
                name: lang.dict.get('choosePartners'),
                component: observer(() => (
                    <div className="choose-partners">
                        <img
                            className="choose-partners__img"
                            src={vm.choosenContractor?.logo?.url}
                            alt="icon"
                            data-is-selected={Boolean(vm.choosenContractor)}
                        />
                        <img
                            className="choose-partners__img"
                            src={vm.choosenConsultant?.logo?.img?.url}
                            alt="icon"
                            data-is-selected={Boolean(vm.choosenConsultant)}
                        />
                    </div>
                )),
                class: 'choose-partners',
                flex: 1.25,
            },
            {
                status: getRelativeStatus([E.ProjectStatus.readyToSign]),
                name: lang.dict.get('signContract'),
                flex: .95,
            },
            {
                status: getRelativeStatus(
                    [
                        E.ProjectStatus.signed,
                        E.ProjectStatus.liveInPm,
                    ],
                ),
                name: lang.dict.get('projectCreatorBtnStartConstruction'),
                flex: .57,
            },
        ],
    };
};

export const ProjectDetails = observer((props: Props) => {
    const vm = hook.useVm(() => new ProjectDetailsVm(props.project));

    const subheader = {
        returnButton: vm.goBack,
    };

    const Component = createViewMap({ vm });

    if (Component === null) {
        vm.goBack();
        return null;
    }

    return (
        <div
            className="project-details"
            data-is-bids={vm.isBidsOpened && (vm.project.projectStatus === E.ProjectStatus.chooseContractor || vm.isBidsPreviewed)}
            data-step={vm.project.projectStatus}
        >
            <Switch
                state={!vm.isInvitingContractor}
                alt={() => <InviteContractor vm={vm} />}
            >
                <PageWithWizard
                    subheader={subheader}
                    subheaderContent={null}
                    stepWizard={steps(vm)}
                >
                    <div className="project-details__container">
                        <Component />
                    </div>
                    <If condition={() => vm.isStatusModalOpened}>
                        <ProjectStatus
                            vm={vm}
                            onClose={vm.closeStatusModal}
                        />
                    </If>
                </PageWithWizard>
            </Switch>
        </div>
    );
});

