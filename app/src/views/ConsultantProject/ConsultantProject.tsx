import { observer } from 'mobx-react';
import type { ReactElement } from 'react';
import { E, lang } from '~/api';
import { ErrorList, If, Loading, ProjectScope, Subheader } from '~/bits';
import { PageWithSidebar } from '~/partials';
import { hook } from '~/utils';
import {
    AcceptDesign,
    AcceptSupervision,
    ProjectDocuments,
    SubmitDrawings,
    SubmitDrawingsRightColumn,
} from './Components';
import { ConsultantProjectVm } from './ConsultantProject.vm';

export const ConsultantProject = observer(() => {
    const vm = hook.useVm(() => new ConsultantProjectVm());

    if (vm.isLoading) {
        return <Loading isEnabled={true} />;
    }

    let content: ReactElement | null = null;

    switch (vm.type) {
        case E.ConsultantProjectType.acceptSupervision:
        case E.ConsultantProjectType.waitingSupervision:
            content = <AcceptSupervision vm={vm} />;
            break;
        case E.ConsultantProjectType.acceptDesign:
        case E.ConsultantProjectType.waitingDesign:
        case E.ConsultantProjectType.closedDesign:
        case E.ConsultantProjectType.rejectedDesign:
            content = <AcceptDesign vm={vm} />;
            break;
        case E.ConsultantProjectType.submitDrawings:
            content = <SubmitDrawings vm={vm} />;
            break;
    }

    return (
        <div className="consultant-project" data-type={vm.type}>
            <PageWithSidebar
                sidebar={() => <ProjectDocuments vm={vm} />}
                pageName="consultant-project"
            >
                <Subheader
                    hasReturnButton={true}
                    returnButton={vm.goBack}
                    pageName={vm.pageName}
                >
                    <Subheader.Right>
                        <div className="property">
                            <p className="property__text-governorate">
                                {vm.project.governorate?.displayName}
                            </p>
                            <p className="property__title">
                                {vm.project.wilayat?.displayName}
                            </p>
                        </div>
                        <div className="property">
                            <p className="property__text-area">
                                {lang.dict.format('squareMetersFormat', [vm.project.landArea])}
                            </p>
                            <p className="property__title">
                                {lang.dict.enum('landType', vm.project.landType)}
                            </p>
                        </div>
                        <If condition={() => Boolean(vm.project.floorLevels)}>
                            <div className="property">
                                <div className="property__text">
                                    {vm.project.floorLevels}
                                </div>
                                <div className="property__title">
                                    {lang.dict.get('projectTileFloorLevels')}
                                </div>
                            </div>
                        </If>
                        <If condition={() => Boolean(vm.project.forConsultant.invitationDate)}>
                            <div className="property">
                                <div className="property__text">
                                    {vm.project.forConsultant.invitationDate?.format('ll')}
                                </div>
                                <div className="property__title">
                                    {lang.dict.get('invitationDate')}
                                </div>
                            </div>
                        </If>
                    </Subheader.Right>
                </Subheader>
                <div className="container">
                    {content}
                </div>
                <If condition={() => vm.type === E.ConsultantProjectType.submitDrawings}>
                    <SubmitDrawingsRightColumn vm={vm} />
                </If>
                <If condition={() => vm.isProjectScope}>
                    <ProjectScope
                        project={vm.project}
                        toggleIsProjectScope={vm.toggleIsProjectScope}
                        sow={vm.projectScopeSow}
                    />
                </If>
                <ErrorList errors={vm.errorListHolder} />
            </PageWithSidebar>
        </div>
    );
});
