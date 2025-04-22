import { useState } from 'react';
import { observer } from 'mobx-react';
import { lang } from '~/api';
import type { Project } from '~/models';
import { If } from '~/bits';
import { MyProjectTileVm } from './MyProjectTile.vm';

type Props = {
    project: Project;
    onClick: () => void;
};

export const MyProjectTile = observer((props: Props) => {
    const { project, onClick } = props;

    const [vm] = useState(() => new MyProjectTileVm(project));

    return (
        <div
            className="my-project-tile"
            onClick={onClick}
        >
            <div className="my-project-tile__row my-project-tile__row--first">
                <div
                    className="my-project-tile__status"
                    data-status={project.generalStatusClient}
                >
                    {lang.dict.enum('projectStatus', project.generalStatusClient)}
                </div>
                <div className="my-project-tile__reference-number">
                    #{project.projectNumber}
                </div>
            </div>
            <div className="my-project-tile__row my-project-tile__row--middle">
                <div className="my-project-tile__location">
                    <div className="my-project-tile__location-title">
                        {project.wilayat?.displayName}
                    </div>
                    <div className="my-project-tile__location-subtitle">
                        {project.governorate?.displayName}
                    </div>
                </div>
                <If condition={() => vm.isShownCountdown}>
                    <div className="my-project-tile__days-left">
                        {vm.countdown}
                    </div>
                </If>
            </div>
            <div className="my-project-tile__row" data-is-floor={Boolean(vm.project.floorLevels)}>
                <div className="my-project-tile__area">
                    <div className="my-project-tile__meters">
                        {vm.area}
                    </div>
                    <div className="my-project-tile__residential">
                        {lang.dict.get('projectTileResidential')}
                    </div>
                </div>
                <div className="my-project-tile__levels">
                    <div className="my-project-tile__levels-symbols">
                        {vm.project.floorLevels}
                    </div>
                    <If condition={() => Boolean(vm.project.floorLevels)}>
                        <div className="my-project-tile__levels-desc">
                            {lang.dict.get('projectTileFloorLevels')}
                        </div>
                    </If>
                </div>
            </div>
        </div>
    );
});
