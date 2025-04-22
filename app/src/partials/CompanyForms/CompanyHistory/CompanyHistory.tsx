import { observer } from 'mobx-react';
import type { ReactElement } from 'react';
import { E, lang, utils, type ErrorListHolder } from '~/api';
import { If, Input } from '~/bits';
import type { CompanyType, ContractorType } from '~/models';
import { hook, preventDefault, utilsString } from '~/utils';
import { CompanyHistoryVm } from './CompanyHistory.vm';

type Props = {
    company: CompanyType;
    contractor?: ContractorType;
    buttons: ReactElement;
    errorListHolder: ErrorListHolder;
    submitAction?: () => void;
};

type ForContractorProps = {
    contractor?: ContractorType;
};

const ForContractor = observer(({ contractor }: ForContractorProps) => {
    if (!contractor) {
        return null;
    }

    return (
        <>
            <Input.Text
                name={lang.dict.get('howMuchDoYouChargePerSquareMeterBlackBuilding')}
                value={utilsString.toFloatingPoint(contractor.chargeBlackProjects)}
                onChange={contractor.setChargeBlackProjects}
                placeHolder={lang.dict.format('omrMax', ['1,000'])}
                shouldCursorMove={true}
            />
            <Input.Text
                name={lang.dict.get('howMuchDoYouChargePerSquareMeterTurnkey')}
                value={utilsString.toFloatingPoint(contractor.chargeTurnkeyProjects)}
                onChange={contractor.setChargeTurnkeyProjects}
                placeHolder={lang.dict.format('omrMax', ['1,000'])}
                shouldCursorMove={true}
            />
        </>
    );
});

export const CompanyHistory = observer((props: Props) => {
    const {
        company,
        contractor,
        buttons,
        errorListHolder,
        submitAction,
    } = props;

    const vm = hook.useVm(() => new CompanyHistoryVm(company, errorListHolder, contractor));

    hook.useAutoFocus();

    return (
        <div className="company-forms company-forms--history">
            <form
                onSubmit={preventDefault(submitAction)}
                className="form"
            >
                <h2 className="form__header">
                    {lang.dict.get('history')}
                </h2>
                <div className="input-container input-container--larger-margin">
                    <Input.Text
                        name={lang.dict.get('howManyProjectsDelivered')}
                        value={utilsString.toFloatingPoint(company.projectsDelivered)}
                        onChange={company.setProjectsDelivered}
                        placeHolder={lang.dict.format('numberMax', ['5,000'])}
                        shouldCursorMove={true}
                    />
                    <Input.Text
                        name={lang.dict.get('whatWasTheLargestProject')}
                        value={utilsString.toFloatingPoint(company.largestProjectAwarded)}
                        onChange={company.setLargestProjectAwarded}
                        placeHolder={lang.dict.format('omrMax', ['10,000,000'])}
                        shouldCursorMove={true}
                    />
                    {/* <Input.Text
                        name={lang.dict.get('howManyProjectsHaveYouWorked')}
                        value={utils.toInputNumber(company.projectsWorkedAtOnce)}
                        onChange={company.setProjectsWorkedAtOnce}
                        placeHolder={lang.dict.format('numberMax', [100])}
                    />
                   
                    <Input.Text
                        name={lang.dict.get('ownersYearsOfExperience')}
                        value={utils.toInputNumber(company.yoursYearsOfExperience)}
                        onChange={company.setYoursYearsOfExperience}
                        placeHolder={lang.dict.format('yearMax', [50])}
                    />
                    <If condition={() => Boolean(contractor)}>
                        <ForContractor contractor={contractor} />
                    </If> */}
                    <div className="radio-container">
                        <p className="radio-text">
                            {lang.dict.get('hasYourOrganizationEverFailedToCompleteWork')}
                        </p>
                        <Input.Checkbox
                            type="radio"
                            text={{
                                first: lang.dict.get('switchYes'),
                                second: lang.dict.get('switchNo'),
                            }}
                            isChecked={company.failedCompleteAwardedWork}
                            onChange={company.setFailedCompleteAwardedWork}
                        />
                    </div>
                    <div className="radio-container">
                        <p className="radio-text">
                            {lang.dict.get('areTheyAnyJudgements')}
                        </p>
                        <Input.Checkbox
                            type="radio"
                            text={{
                                first: lang.dict.get('switchYes'),
                                second: lang.dict.get('switchNo'),
                            }}
                            onChange={company.setAnyJudgmentsPendingOrOutstanding}
                            isChecked={company.anyJudgmentsPendingOrOutstanding}
                        />
                    </div>
                </div>
                {/* Marketing */}
                {/* <div className="form-marketing">
                    <h2 className="form__header">
                        {lang.dict.get('marketingInformation')}
                        <span className="form__optional-text">
                            {lang.dict.get('fieldOptional')}
                        </span>
                    </h2>
                    <div className="input-container">
                        <Input.Text
                            name={lang.dict.get('companyWebsite')}
                            value={vm.marketing.companyWebsite}
                            onChange={x => vm.setMarketingOf(E.MarketingService.companyWebsite, x)}
                            placeHolder={lang.dict.get('fieldWebsiteUrl')}
                        />
                        <Input.Text
                            name={lang.dict.get('instagramAccount')}
                            value={vm.marketing.instagram}
                            onChange={x => vm.setMarketingOf(E.MarketingService.instagram, x)}
                            placeHolder={lang.dict.get('fieldWebsiteUrl')}
                        />
                        <Input.Text
                            name={lang.dict.get('linkedInAccount')}
                            value={vm.marketing.linkedIn}
                            onChange={x => vm.setMarketingOf(E.MarketingService.linkedIn, x)}
                            placeHolder={lang.dict.get('fieldWebsiteUrl')}
                        />
                        <Input.Text
                            name={lang.dict.get('twitterAccount')}
                            value={vm.marketing.twitter}
                            onChange={x => vm.setMarketingOf(E.MarketingService.twitter, x)}
                            placeHolder={lang.dict.get('fieldWebsiteUrl')}
                        />
                        <Input.Text
                            name={lang.dict.get('pinterestAccount')}
                            value={vm.marketing.pinterest}
                            onChange={x => vm.setMarketingOf(E.MarketingService.pinterest, x)}
                            placeHolder={lang.dict.get('fieldWebsiteUrl')}
                        />
                        <Input.Text
                            name={lang.dict.get('dribbbleAccount')}
                            value={vm.marketing.dribbble}
                            onChange={x => vm.setMarketingOf(E.MarketingService.dribbble, x)}
                            placeHolder={lang.dict.get('fieldWebsiteUrl')}
                        />
                        <Input.Text
                            name={lang.dict.get('whatsappAccount')}
                            value={vm.marketing.whatsapp}
                            onChange={x => vm.setMarketingOf(E.MarketingService.whatsapp, x)}
                            placeHolder={lang.dict.get('fieldWebsiteUrl')}
                        />
                        <Input.Text
                            name={lang.dict.get('behanceAccount')}
                            value={vm.marketing.behance}
                            onChange={x => vm.setMarketingOf(E.MarketingService.behance, x)}
                            placeHolder={lang.dict.get('fieldWebsiteUrl')}
                        />
                        <Input.Text
                            name={lang.dict.get('tikTokAccount')}
                            value={vm.marketing.tikTok}
                            onChange={x => vm.setMarketingOf(E.MarketingService.tikTok, x)}
                            placeHolder={lang.dict.get('fieldWebsiteUrl')}
                        />
                        <Input.Text
                            name={lang.dict.get('houzzAccount')}
                            value={vm.marketing.houzz}
                            onChange={x => vm.setMarketingOf(E.MarketingService.houzz, x)}
                            placeHolder={lang.dict.get('fieldWebsiteUrl')}
                        />
                        <Input.Text
                            name={lang.dict.get('otherMarketingPlatform')}
                            value={vm.marketing.other}
                            onChange={x => vm.setMarketingOf(E.MarketingService.other, x)}
                            placeHolder={lang.dict.get('fieldWebsiteUrl')}
                        />
                    </div>
                </div> */}
                <div className="form__btns">
                    {buttons}
                </div>
            </form>
        </div>
    );
});
