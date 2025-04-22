import { observer } from 'mobx-react';
import { News } from '~/bits';
import { hook } from '~/utils';
import { EbinaaStats } from './Component/EbinaaStats';
import { StatsAndNewsVm } from './StatsAndNews.vm';

export const StatsAndNews = observer(() => {
    const vm = hook.useVm(() => new StatsAndNewsVm());

    return (
        <div className="sidebar-container">
            <div className="sidebar">
                <EbinaaStats
                    totalProjects={vm.stats.data.totalProjects}
                    projectsInConstruction={vm.stats.data.projectsConstruction}
                    projectInDesign={vm.stats.data.projectsDesign}
                    totalContractors={vm.stats.data.contractorCount}
                    totalConsultants={vm.stats.data.consultantCount}
                    totalValueOfProject={vm.totalValueOfProject}
                />
                <News news={vm.advertisements} />
            </div>
        </div>
    );
});
