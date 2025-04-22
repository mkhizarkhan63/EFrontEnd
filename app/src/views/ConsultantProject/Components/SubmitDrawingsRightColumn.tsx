import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button, Icons } from '~/bits';
import type { ConsultantProjectVm } from '../ConsultantProject.vm';
import { Detail } from './Detail';
import { ImageDetail } from './ImageDetail';

type Props = {
    vm: ConsultantProjectVm;
};

export const SubmitDrawingsRightColumn = observer(({ vm }: Props) => (
    <div className="submit-drawings-right">
        <p className="submit-drawings-right__title">
            {lang.dict.get('projectDetails')}
        </p>
        <div className="submit-drawings-right__content">
            <div className="detail-list">
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
            <div className="submit-drawings-right__scope-btn">
                <Button
                    color="transparent"
                    value={lang.dict.get('seeProjectSpecifications')}
                    onClick={vm.toggleIsProjectScope}
                />
            </div>
            <div className="client-details">
                <p className="client-details__title">
                    {lang.dict.get('clientDetails')}
                </p>
                <div className="client-details__info">
                    <img
                        src={vm.project.forConsultant.clientAvatar?.url}
                        alt="avatar"
                        className="client-details__img"
                    />
                    <div className="client-details__desc">
                        <p className="client-details__name">
                            {vm.project.forConsultant.clientName}
                        </p>
                        <div className="client-details__contact">
                            <a
                                href={`mailto:${vm.project.forConsultant.clientEmail}`}
                                className="client-details__contact-link"
                            >
                                <Icons icon="email" />
                                {vm.project.forConsultant.clientEmail}
                            </a>
                        </div>
                        <div className="client-details__contact">
                            <a
                                href={`tel:${vm.project.forConsultant.clientContact}`}
                                className="client-details__contact-link"
                            >
                                <Icons icon="phone" />
                                {vm.project.forConsultant.clientContact}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
));
