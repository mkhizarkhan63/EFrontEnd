import { observer } from 'mobx-react';
import { lang, E } from '~/api';
import { If, Switch } from '~/bits';
import { type Project } from '~/models';

type Props = {
    project: Project;
    countdown?: string;
    profileType?: E.ProfileType;
    onClick: () => void;
};

export const ProjectTile = observer((props: Props) => (
    <div
        className="project-tile"
        onClick={props.onClick}
    >
        <div className="project-tile__row project-tile__row--first">
            <div className="project-tile__status" >
                <Switch
                    state={() => props.project.areYouWinner(props.profileType)}
                    alt={() => (
                        <p className="project-tile__status-step" data-step={E.ProjectStatus.archived}>
                            {lang.dict.enum('projectCompanyStatus', E.ProjectStatus.archived)}
                        </p>
                    )}
                >
                    <p className="project-tile__status-step" data-step={props.project.generalStatus}>
                        {lang.dict.enum('projectCompanyStatus', props.project.generalStatus)}
                    </p>
                </Switch>
            </div>
            <div className="project-tile__id">
                #{props.project.projectNumber}
            </div>
        </div>
        <div className="project-tile__row">
            <div className="project-tile__location">
                <p className="project-tile__location-title">
                    {props.project.wilayat?.displayName}
                </p>
                <p className="project-tile__location-subtitle">
                    {props.project.governorate?.displayName}
                </p>
            </div>
            <div className="project-tile__days-left">
                <If condition={Boolean(props.countdown)}>
                    <p className="project-tile__days-left-num">{props.countdown}</p>
                </If>
            </div>
        </div>
        <div className="project-tile__row">
            <div className="project-tile__area">
                <p className="project-tile__meters">
                    {lang.dict.format('squareMetersFormat', [props.project.addedBuiltUpArea])}
                </p>
                <p className="project-tile__residential">
                    {lang.dict.get('projectTileResidential')}
                </p>
            </div>
            <div className="project-tile__levels">
                <p className="project-tile__levels-symbols">
                    {props.project.floorLevels}
                </p>
                <If condition={Boolean(props.project.floorLevels)}>
                    <p className="project-tile__levels-desc">
                        {lang.dict.get('projectTileFloorLevels')}
                    </p>
                </If>
            </div>
        </div>
    </div>
));
