import { observer } from 'mobx-react';
import type { ReactElement } from 'react';
import { E, lang } from '~/api';
import { Button, If, Input } from '~/bits';
import type { ConsultantProjectVm } from '../ConsultantProject.vm';
import { ClientDetails } from './ClientDetails';
import { Detail } from './Detail';
import { ImageDetail } from './ImageDetail';

type Props = {
    vm: ConsultantProjectVm;
};

export const AcceptDesign = observer(({ vm }: Props) => {
    let content: ReactElement | null = null;

    switch (vm.type) {
        case E.ConsultantProjectType.acceptSupervision:
        case E.ConsultantProjectType.acceptDesign:
            content = (
                <>
                    <div className="consultant-project-box__project-buttons">
                        <Button
                            color="white"
                            value={lang.dict.get('reject')}
                            onClick={vm.rejectDesign}
                        />
                        <Button
                            color="green"
                            value={lang.dict.get('accept')}
                            onClick={vm.acceptDesign}
                            rightImg="next"
                        />
                    </div>
                    <If condition={() => typeof vm.rejectMessage !== 'undefined'}>
                        <Input.Text
                            description={lang.dict.get('enterRejectReason')}
                            value={vm.rejectMessage}
                            onChange={vm.setRejectMessage}
                        />
                    </If>
                </>
            );
            break;
        case E.ConsultantProjectType.waitingDesign:
            content = (
                <p className="accept-design__text">
                    {lang.dict.get('waitingForClient')}
                </p>
            );
            break;
        case E.ConsultantProjectType.closedDesign:
            content = (
                <p className="accept-design__text">
                    {lang.dict.get('closed')}
                </p>
            );
            break;
        case E.ConsultantProjectType.rejectedDesign:
            content = (
                <p className="accept-design__text">
                    {lang.dict.get('rejected')}
                </p>
            );
            break;
    }

    return (
        <div className="consultant-project-box accept-design">
            <div className="consultant-project-box__project-container">
                <div className="consultant-project-box__project">
                    <div className="accept-design__project-info">
                        <img
                            src={vm.design?.mainImg}
                            alt="design"
                            className="accept-design__project-img"
                        />
                        <div className="accept-design__project-desc">
                            <p className="accept-design__project-text">
                                {lang.dict.get('youHaveSelectedDesign')}
                            </p>
                            <p className="accept-design__project-title">
                                &quot;{vm.design?.title}&quot;
                            </p>
                        </div>
                    </div>
                    <If condition={() => vm.project.designStatus === E.DesignProjectStatus.advancePaymentDesign}>
                        <p className="accept-design__text">
                            {lang.dict.get('clientIsWaitingDesign')}
                        </p>
                    </If>
                    <div className="detail-list">
                        <p className="detail-list__title">
                            {lang.dict.get('projectDetails')}
                        </p>
                        <Detail
                            description={lang.dict.get('projectPrice')}
                            value={lang.dict.format('omrFormat', [vm.design?.designPrice.toLocaleString()])}
                        />
                        <Detail
                            description={lang.dict.get('estConstructionPrice')}
                            value={lang.dict.format('omrFormat', [vm.design?.estimatedConstructionPrice.toLocaleString()])}
                        />
                    </div>
                    <div className="design-icons">
                        <div className="design-icon design-icon--built-up">
                            <ImageDetail
                                imageSrc="/assets/graphics/built_up_area.svg"
                                imageAlt="square"
                                description={lang.dict.get('builtUpArea')}
                                value={lang.dict.format('squareMetersFormat', [vm.design?.builtUpArea])}
                            />
                        </div>
                        <div className="design-icon design-icon--bedroom">
                            <ImageDetail
                                imageSrc="/assets/graphics/bedroom.svg"
                                imageAlt="bedroom"
                                description={lang.dict.get('bedroom')}
                                value={vm.design?.bedrooms.toString().padStart(2, '0')}
                            />
                        </div>
                        <div className="design-icon design-icon--toilets">
                            <ImageDetail
                                imageSrc="/assets/graphics/toilets.svg"
                                imageAlt="toilets"
                                description={lang.dict.get('toilets')}
                                value={vm.design?.toilets.toString().padStart(2, '0')}
                            />
                        </div>
                    </div>
                    <div className="consultant-project-box__project-scope-btn">
                        <Button
                            color="transparent"
                            value={lang.dict.get('seeProjectSpecifications')}
                            onClick={vm.toggleIsProjectScope}
                        />
                    </div>
                    {content}
                </div>
            </div>
            <ClientDetails vm={vm} />
        </div>
    );
});
