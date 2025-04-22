import { observer } from 'mobx-react';
import type { Moment } from 'moment';
import { lang } from '~/api';
import { Button, If } from '~/bits';
import type { Project } from '~/models';
import { stores } from '~/stores';

type Props = {
    title?: string;
    project: Project;
    entryText: string;
    countdown?: string;
    isInvitation: boolean;
    background?: 'green' | 'orange';
    closingDate: Moment;
    onEntry: () => void;
    onReject?: () => void;
    isExternalInvitation?: boolean;
};

export const NewProjectTile = observer((props: Props) => (
    <div className="new-project-tile-container">
        <div className="new-project-tile-label" data-background={props.background}>
            {props.title}
        </div>
        <div className="new-project-tile" data-background={props.background}>
            <div className="new-project-tile__row">
                <div className="new-project-tile__location">
                    <p className="new-project-tile__location-title">
                        {props.project.governorate?.displayName}
                    </p>
                    <p className="new-project-tile__location-subtitle">
                        {props.project.wilayat?.displayName}
                    </p>
                </div>
                <If condition={() => Boolean(props.countdown)}>
                    <div className="new-project-tile__days-left">
                        <p>{props.countdown}</p>
                    </div>
                </If>
            </div>
            <div className="new-project-tile__row new-project-tile__row--middle">
                <div className="new-project-tile__area">
                    <p className="new-project-tile__meters">
                        {lang.dict.format('squareMetersFormat', [props.project.addedBuiltUpArea])}
                    </p>
                    <p className="new-project-tile__residential">
                        {lang.dict.enum('landType', props.project.landType)}
                    </p>
                </div>
                <div className="new-project-tile__bids">
                    <If condition={() => props.isInvitation}>
                        <p className="new-project-tile__bids-desc">
                            {lang.dict.get('projectTileInvitedYou')}
                        </p>
                        <p className="new-project-tile__bids-value">
                            {props.project.forConsultant.clientName ?? props.project.client?.name}
                        </p>
                    </If>
                </div>
            </div>
            <div className="new-project-tile__row">
                <div className="new-project-tile__levels">
                    <If condition={Boolean(props.project.floorLevels)}>
                        <p className="new-project-tile__levels-symbols">
                            {props.project.floorLevels}
                        </p>
                        <p className="new-project-tile__levels-desc">
                            {lang.dict.get('projectTileFloorLevels')}
                        </p>
                    </If>
                </div>
                <div className="new-project-tile__date">
                    <p className="new-project-tile__date-number">
                        {props.closingDate.format('MMM D, YYYY')}
                    </p>
                    <p className="new-project-tile__date-desc">
                        {lang.dict.get('projectTileClosingDate')}
                    </p>
                </div>
            </div>
            <div className="new-project-tile__row new-project-tile__row--last">
                <If condition={() => !props.isInvitation}>
                    <div>
                        <div className="new-project-tile__status">
                            <p className="new-project-tile__status-desc">
                                {lang.dict.enum('constructionType', props.project.constructionType)}
                            </p>
                            <p className="new-project-tile__status-type">
                                {lang.dict.get('projectTileProjectType')}
                            </p>
                        </div>
                    </div>
                </If>
                <If condition={() => !props.isInvitation && stores.profile.isValid && props.project.isOpenToBid}>
                    <Button
                        color={props.background ?? 'blue'}
                        value={props.entryText}
                        onClick={props.onEntry}
                        rightImg="next"
                    />
                </If>
                <If condition={() => stores.profile.isValid && props.isInvitation}>
                    <Button
                        color="white"
                        value={lang.dict.get('reject')}
                        onClick={props.onReject}
                    />
                    <If condition={!props.isExternalInvitation}>
                        <Button
                            color={props.background ?? 'blue'}
                            value={props.entryText}
                            onClick={props.onEntry}
                            rightImg="next"
                        />
                    </If>
                </If>
            </div>
        </div>
    </div>
));
