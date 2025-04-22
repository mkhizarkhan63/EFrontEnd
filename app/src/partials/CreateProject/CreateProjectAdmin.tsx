import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, ErrorList, If, Loading, Subheader } from '~/bits';
import { Page } from '~/partials';
import { stores } from '~/stores';
import { hook } from '~/utils';
import { CreateProjectAdminVm } from './CreateProjectAdmin.vm';
import { Client, Designs, Krookie, Land, ProjectType, StartingStep } from './Parts';

type Props = {
    renderWithPage: boolean;
};

export const CreateProjectAdmin = observer(({ renderWithPage }: Props) => {
    const vm = hook.useVm(() => new CreateProjectAdminVm());

    const contentConstruction = (
        <>
            <Loading isEnabled={stores.locations.dicts.status.isWorking} />
            <ErrorList errors={vm.errorListHolder} />
            <div className="project-creator" data-is-admin="true">
                <form className="form">
                    <Client withoutName={true} />
                    <Land />
                    <Krookie />
                    <StartingStep isEdit={renderWithPage} />
                    <Designs />
                    <ProjectType />
                    <div className="form__bottom-buttons">
                        <Button
                            color="green"
                            value={lang.dict.get('save')}
                            rightImg="next"
                            onClick={() => vm.save(false)}
                        />
                        <Button
                            color="blue"
                            value={lang.dict.get('publish')}
                            rightImg="next"
                            onClick={() => vm.save(true)}
                        />
                    </div>
                </form>
            </div>
        </>
    );

    const contentDesign = (
        <>
            <Loading isEnabled={stores.locations.dicts.status.isWorking} />
            <ErrorList errors={vm.errorListHolder} />
            <div className="project-creator" data-is-admin="true">
                <form className="form">
                    <Client withoutName={true} />
                    <Land />
                    <Krookie />
                    <StartingStep isEdit={renderWithPage} />
                    <div className="form__bottom-buttons">
                        <Button
                            color="green"
                            value={lang.dict.get('save')}
                            rightImg="next"
                            onClick={() => vm.save(false, true)}
                        />
                    </div>
                </form>
            </div>
        </>
    );

    const content = vm.isDesign ? contentDesign : contentConstruction;

    return (
        <>
            <If condition={() => renderWithPage}>
                <Page>
                    <div className="subheader-project-creator">
                        <Subheader
                            returnButton={vm.goBack}
                            hasReturnButton={true}
                            pageName={lang.dict.get('createProject')}
                        />
                    </div>
                    {content}
                </Page>
            </If>
            <If condition={() => !renderWithPage}>
                {content}
            </If>
        </>
    );
});
