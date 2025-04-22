import { observer } from 'mobx-react';
import { Button, Icons } from '~/bits';
import { Page } from '~/partials';
import { lang } from '~/api';
import { hook } from '~/utils';
import { SubmittedProfileVm } from './SubmittedProfile.vm';

export const SubmittedProfile = observer(() => {
    const vm = hook.useVm(() => new SubmittedProfileVm());

    return (
        <Page>
            <div className="profile-submitted">
                <div className="profile-submitted__container">
                    <div className="profile-submitted__icon">
                        <Icons icon="tick" />
                    </div>
                    <div className="profile-submitted__header">
                        {lang.dict.get('registerContractorSubmitCongratulations')}
                    </div>
                    <div className="profile-submitted__subheader">
                        {lang.dict.get('registerContractorSubmitYourContractor')}
                    </div>
                    <div className="profile-submitted__text">
                        {lang.dict.get('registerContractorSubmitEbinna')}
                    </div>
                    <Button
                        color="blue"
                        rightImg="next"
                        onClick={vm.changeContext}
                        value={lang.dict.get('registerContractorSubmitEdit')}
                    />
                </div>
            </div>
        </Page>
    );
});
