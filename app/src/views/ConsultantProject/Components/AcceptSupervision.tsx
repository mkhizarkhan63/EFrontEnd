import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { Button, If } from '~/bits';
import type { ConsultantProjectVm } from '../ConsultantProject.vm';
import { ClientDetails } from './ClientDetails';
import { Detail } from './Detail';

type Props = {
    vm: ConsultantProjectVm;
};

export const AcceptSupervision = observer(({ vm }: Props) => {
    const subTitle = lang.dict.get(vm.type === E.ConsultantProjectType.acceptSupervision
        ? 'clientIsWaitingSupervision'
        : 'waitingForClient',
    );

    return (
        <div className="consultant-project-box accept-supervision">
            <div className="consultant-project-box__project-container">
                <div className="consultant-project-box__project">
                    <p className="consultant-project-box__project-title">
                        {lang.dict.get('projectTileYouGotInvitedSupervision')}
                    </p>
                    <p className="consultant-project-box__project-text">
                        {subTitle}
                    </p>
                    <div className="detail-list">
                        <p className="detail-list__title">
                            {lang.dict.get('projectDetails')}
                        </p>
                        <Detail
                            description={lang.dict.get('governorate')}
                            value={vm.project.governorate?.displayName}
                        />
                        <Detail
                            description={lang.dict.get('wilayat')}
                            value={vm.project.wilayat?.displayName}
                        />
                        <Detail
                            description={lang.dict.get('landArea')}
                            value={lang.dict.format('squareMetersFormat', [vm.project?.landArea])}
                        />
                        <Detail
                            description={lang.dict.get('landType')}
                            value={lang.dict.enum('landType', vm.project.landType)}
                        />
                        <Detail
                            description={lang.dict.get('projectTileFloorLevels')}
                            value={vm.project.floorLevels}
                        />
                    </div>
                    <div className="consultant-project-box__project-scope-btn">
                        <Button
                            color="transparent"
                            value={lang.dict.get('seeProjectSpecifications')}
                            onClick={vm.toggleIsProjectScope}
                        />
                    </div>
                    <If condition={() => vm.type === E.ConsultantProjectType.acceptSupervision}>
                        <div className="consultant-project-box__project-buttons">
                            <Button
                                color="white"
                                value={lang.dict.get('reject')}
                                onClick={vm.rejectSupervision}
                            />
                            <Button
                                color="green"
                                value={lang.dict.get('accept')}
                                onClick={vm.acceptSupervision}
                                rightImg="next"
                            />
                        </div>
                    </If>
                </div>
            </div>
            <ClientDetails vm={vm} />
        </div>
    );
});
