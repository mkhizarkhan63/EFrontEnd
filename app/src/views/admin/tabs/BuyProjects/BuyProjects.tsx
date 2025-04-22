import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, Icons, If, Input, Loading, SortedTable } from '~/bits';
import { BuyProjectsVm } from './BuyProjects.vm';
import { BuyProjectStep } from './BuyProjectsStep/BuyProjectStep';
import { hook } from '~/utils';
import { ProjectInformation } from './Component/ProjectInformation/ProjectInformation';
import { ProjectLevel } from './Component/ProjectLevel/ProjectLevel';
import { ProjectImagesTags } from './Component/ProjectImageTags/ProjectImagesTags';
import { ProjectFeatures } from './Component/ProjectFeatures/ProjectFeatures';
import { ProjectDocuments } from './Component/ProjectDocuments/ProjectDocuments';
import { Page } from '~/partials';

const createViewMap = (vm: BuyProjectsVm, tab: E.BuyProjectMenu): React.ComponentType | null => {
    switch (tab) {

        case E.BuyProjectMenu.project_information:
            return () => <ProjectInformation parentVm={vm} />;


        case E.BuyProjectMenu.project_levels:
            return () => <ProjectLevel parentVm={vm} />;


        case E.BuyProjectMenu.project_images_and_tags:
            return () => <ProjectImagesTags parentVm={vm} />;


        // case E.BuyProjectMenu.project_features:
        //     return () => <ProjectFeatures parentVm={vm} />;


        case E.BuyProjectMenu.project_documents:
            return () => <ProjectDocuments parentVm={vm} />;

        default:
            return null;
    }
}


export const BuyProjects = observer(() => {
    const vm = hook.useVm(() => new BuyProjectsVm());
    const Component = createViewMap(vm, vm.currentTab);

    return (
        <Page>
            <div className="buyprojects-container">
                <div className="buyprojects-container-left">
                    <BuyProjectStep vm={vm} />
                </div>
                <div className="buyprojects-container-right">
                    <div className='headers'>
                        <div onClick={vm.goBack}>
                            <Icons icon='return' />
                        </div>
                        <div className='buyprojects-title'>
                            <h2 className='buyprojects-title-heading'>{lang.dict.get('projectRegistration')}</h2>
                            <p className='buyprojects-title-subheading'>{lang.dict.get('projectRegistrationSubDetails')}</p>
                        </div>
                    </div>

                    <div className='buyproject-cards'
                        data-type={"cards"} >
                        <div className='buyproject-cards-container'>
                            <div className='buyproject-cards-container_mainheader'
                                data-is-completed={vm.isMenuItemCompleted(vm.currentTab)}>

                                <div className="buyproject-cards-container_mainheader_highlight" ></div>
                                <div className="buyproject-cards-container_mainheader_header">
                                    <p className="buyproject-cards-container_mainheader_title">{vm.tabTitle}</p>
                                    <Button
                                        color="white"
                                        isCircle={true}
                                        centerImg="dropdown-up"
                                    //onClick={() => vm.switchIsClosed(tab)}
                                    //  data-is-completed={vm.isMenuItemCompleted(tab)}
                                    />
                                </div>
                            </div>


                            <div className="buyproject-cards-container_body">

                                {Component && <Component />}

                                <div className='buyproject-cards-container_footer'>

                                    {vm.currentTab == E.BuyProjectMenu.project_documents ? (<Button
                                        color="blue"
                                        rightImg="next"
                                        value={lang.dict.get('submit')}
                                    // onClick={vm.goToNextStep}
                                    // isDisabled={vm.isMenuItemCompleted(tab)}
                                    />)
                                        : (<Button
                                            color="blue"
                                            rightImg="next"
                                            value={lang.dict.get('goNext')}
                                            onClick={vm.goToNextStep}
                                            isDisabled={vm.isMenuItemCompleted(vm.currentTab)}
                                        />)}
                                    {vm.currentTab === E.BuyProjectMenu.project_documents && (
                                        <Button

                                            color="white"
                                            // rightImg="next"
                                            value={lang.dict.get('previewProject')}
                                        // onClick={vm.goToNextStep}
                                        // isDisabled={vm.isMenuItemCompleted(tab)}
                                        />

                                    )}
                                    <Button
                                        color='white'
                                        value={lang.dict.get('saveAsDraft')}
                                        isDisabled={vm.isMenuItemCompleted(vm.currentTab)}
                                    />
                                    {vm.currentTab !== E.BuyProjectMenu.project_information ? (
                                        <div className='back-btn'>
                                            <Button
                                                color='white'
                                                value={lang.dict.get('goBack')}
                                                leftImg="back"
                                                onClick={vm.goToBackStep}
                                            />
                                        </div>

                                    ) : (<></>)}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </Page>
    );
})