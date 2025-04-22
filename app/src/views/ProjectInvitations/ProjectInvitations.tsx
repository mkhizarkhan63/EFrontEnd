import { E, lang } from '~/api';
import { Page } from '~/partials';
import { useVm } from '~/utils/hook';
import { ProjectInvitationsVm } from './ProjectInvitations.vm';
import { Button, If, NewProjectTile, Switch } from '~/bits';
import { ShortRegistration } from './ShortRegistration';
import { observer } from 'mobx-react';
import moment from 'moment';

export const ProjectInvitations = observer(() => {
    const vm = useVm(() => new ProjectInvitationsVm());

    if (!vm.isProjectsLoaded) {
        return null;
    }

    const contractorProjects = vm.contractorProjects.map(project => (
        <NewProjectTile
            key={`new-tile-${project.id.asStr()}`}
            project={project}
            entryText=""
            onEntry={() => { /* */ }}
            onReject={() => vm.rejectInvitation(false, E.SpecialProfileMode.simpleContractorCreation, project.id.asNumber())}
            isInvitation={true}
            closingDate={moment()}
            isExternalInvitation={true}
        />
    ));

    const consultantProjects = vm.consultantProjects.map(project => (
        <NewProjectTile
            key={`new-tile-${project.id.asStr()}`}
            project={project}
            entryText=""
            onEntry={() => { /* */ }}
            onReject={() => vm.rejectInvitation(false, E.SpecialProfileMode.simpleConsultantCreation, project.id.asNumber())}
            isInvitation={true}
            closingDate={project.bidClosingDate}
            isExternalInvitation={true}
        />
    ));

    return (
        <Page>
            <div className="project-invitations">
                <Switch
                    alt={() => <ShortRegistration vm={vm} />}
                    state={!vm.isRegistering}
                >
                    <div className="project-invitations__main">
                        <If condition={vm.canCreateContractorCompany}>
                            <p className="project-invitations__title">
                                {lang.dict.get('contractorInvites')}
                            </p>
                            <div className="project-invitations__grid">
                                {contractorProjects}
                            </div>
                            <div className="project-invitations__btns">
                                <Button
                                    color="white"
                                    value={lang.dict.get('rejectAll')}
                                    leftImg="close-red"
                                    onClick={() => vm.rejectInvitation(true, E.SpecialProfileMode.simpleContractorCreation)}
                                />
                                <Button
                                    color="blue"
                                    value={lang.dict.get('createCompany')}
                                    rightImg="next"
                                    onClick={() => vm.openRegistration(E.RoleInCompany.contractor)}
                                />
                            </div>
                        </If>
                        <If condition={vm.canCreateConsultantCompany}>
                            <p className="project-invitations__title">
                                {lang.dict.get('consultantInvites')}
                            </p>
                            <div className="project-invitations__grid">
                                {consultantProjects}
                            </div>
                            <div className="project-invitations__btns">
                                <Button
                                    color="white"
                                    value={lang.dict.get('rejectAll')}
                                    leftImg="close-red"
                                    onClick={() => vm.rejectInvitation(true, E.SpecialProfileMode.simpleContractorCreation)}
                                />
                                <Button
                                    color="blue"
                                    value={lang.dict.get('createCompany')}
                                    rightImg="next"
                                    onClick={() => vm.openRegistration(E.RoleInCompany.consultant)}
                                />
                            </div>
                        </If>
                    </div>
                </Switch>
            </div>
        </Page>
    );
});
