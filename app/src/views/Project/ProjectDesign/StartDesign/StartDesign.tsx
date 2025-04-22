import { observer } from 'mobx-react';
import type { Project } from '~/models';
import { Page } from '~/partials';
import { hook } from '~/utils';
import { LoadingPage } from '~/views';
import { DesignList, ProjectSubHeader } from './Components';
import { StartDesignVm } from './StartDesign.vm';
import { E } from '~/api';
import { If } from '~/bits';
import { ArchitectList } from './Components/ArchitectList';

type Props = {
    project: Project;
};

export const StartDesign = observer((props: Props) => {
    const vm = hook.useVm(() => new StartDesignVm(props.project));

    if (vm.isLoading) {
        return <LoadingPage />;
    }

    return (
        <div
            className="project-design"
            data-architect-list={vm.currentPage === E.DesignListingMenu.architectListings}
        >
            <Page isLazy={true}>
                <ProjectSubHeader vm={vm} />
                <If condition={vm.currentPage === E.DesignListingMenu.designListings}>
                    <div className="container">
                        <DesignList vm={vm} />
                    </div>
                </If>
                <If condition={vm.currentPage === E.DesignListingMenu.architectListings}>
                    <div className="container">
                        <ArchitectList vm={vm} />
                    </div>
                </If>
            </Page>
        </div>
    );
});
