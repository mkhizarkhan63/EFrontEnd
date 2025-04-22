import { useState } from 'react';
import { observer } from 'mobx-react';
import { lang, type E } from '~/api';
import { Page } from '~/partials';
import { Input, Button, Subheader, Icons } from '~/bits';
import { RegisterCompanyVm } from './RegisterCompany.vm';
import { ProfileType } from '~/api/Enums';

type Props = {
    onSubmit?: (type: E.ProfileType) => void;
};

const createContentMap = (type: string) => {

    switch (type) {

        case ProfileType.developer:
            return (<>
                <p><Icons icon='tick-gray' /> {lang.dict.get("contentCommercialRegistration")}</p>
                <p><Icons icon='tick-gray' /> {lang.dict.get("developerContentCompanyOwnerPartner")}</p>
                <p><Icons icon='tick-gray' /> {lang.dict.get("developerContentMOHUP")}</p>
            </>)
        case ProfileType.consultant:
            return (<>
                <p><Icons icon='tick-gray' /> {lang.dict.get("contentCommercialRegistration")}</p>
                <p><Icons icon='tick-gray' /> {lang.dict.get("contentCompanyOwnerPartner")}</p>
                <p><Icons icon='tick-gray' /> {lang.dict.get("consultantContentConsultancyMOCII")}</p>
                <p><Icons icon='tick-gray' /> {lang.dict.get("contentScoringMalaa")}</p>
            </>)
        case ProfileType.contractor:
            return (<>
                <p><Icons icon='tick-gray' /> {lang.dict.get("contentCommercialRegistration")}</p>
                <p><Icons icon='tick-gray' /> {lang.dict.get("contentCompanyOwnerPartner")}</p>
                <p><Icons icon='tick-gray' /> {lang.dict.get("contractorContentRegisteredLabors")}</p>
                <p><Icons icon='tick-gray' /> {lang.dict.get("contentScoringMalaa")}</p>
            </>)
        case ProfileType.architect:
            return (<>
                <p><Icons icon='tick-gray' /> {lang.dict.get("architectContentCommercialRegistration")}</p>
                <p><Icons icon='tick-gray' /> {lang.dict.get("contentCompanyOwnerPartner")}</p>
                <p><Icons icon='tick-gray' /> {lang.dict.get("architectContentEngineeringConsultancy")}</p>
            </>)
        default:
            return null;

    }
}

export const RegisterCompany = observer((props: Props) => {
    const [vm] = useState(() => new RegisterCompanyVm());

    vm.setSubmit(props.onSubmit);

    return (
        <Page>
            <div className="subheader-register-company">
                <Subheader
                    hasReturnButton={true}
                    pageName={lang.dict.get('profileAddCompany')}
                    returnButton={vm.goHome}
                />
            </div>
            <div className='company-register-box'>
                <div className="register-box">
                    <div className="register-box__header">
                        {lang.dict.get('registerHeader')}
                    </div>
                    <p className="register-box__description">
                        {lang.dict.get('registerDesc')}
                    </p>

                    <Input.Multiple
                        type="toggle"
                        values={vm.accountType}
                        onChange={vm.handleClick}
                    />
                    <Button
                        color="blue"
                        value={lang.dict.get('registerNow')}
                        rightImg="next"
                        onClick={vm.submit}
                        isDisabled={vm.isDisabled}
                    />
                </div>
                <div className='register-box-content'>
                    <div className='title'>{lang.dict.get('minimumRequirementCompanyRegistration')}</div>
                    <div className='body'>

                        {createContentMap(vm.saveAccountType)}

                    </div>
                </div>
            </div>
        </Page>
    );

});
