import { observer } from 'mobx-react';
import type { ReactElement } from 'react';
import { E, lang, utils, type ErrorListHolder } from '~/api';
import { If, Input } from '~/bits';
import type { CompanyType, ContractorType } from '~/models';
import { hook, preventDefault, utilsString } from '~/utils';
import { CompanyHistoryVm } from '../CompanyHistory/CompanyHistory.vm';

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

export const CompanyMarketing = observer((props: Props) => {
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
        <div className="company-forms company-forms--marketing">
            <form
                onSubmit={preventDefault(submitAction)}
                className="form"
            >
                {/* Marketing */}
                <div className="form-marketing">
                    <h2 className="form__header">
                        {lang.dict.get('marketing')}
                    </h2>
                    <div className="input-container-grid">
                        <div className='input-container'>
                            <p>{lang.dict.get('whatsappAccount')}
                            </p>
                            <Input.Text
                                value={vm.marketing.whatsapp}
                                onChange={x => vm.setMarketingOf(E.MarketingService.whatsapp, x)}
                                placeHolder={lang.dict.get('fieldWebsiteUrl')}
                            />
                        </div>
                        <div className='input-container'>
                            <p>{lang.dict.get('companyWebsite')}
                                <span className="form__optional-text">
                                    {lang.dict.get('fieldOptional')}
                                </span>
                            </p>
                            <Input.Text
                                value={vm.marketing.companyWebsite}
                                onChange={x => vm.setMarketingOf(E.MarketingService.companyWebsite, x)}
                                placeHolder={lang.dict.get('fieldWebsiteUrl')}

                            />
                        </div>

                        <div className='input-container'>
                            <p>{lang.dict.get('instagramAccount')}
                                <span className="form__optional-text">
                                    {lang.dict.get('fieldOptional')}
                                </span>
                            </p>
                            <Input.Text
                                value={vm.marketing.instagram}
                                onChange={x => vm.setMarketingOf(E.MarketingService.instagram, x)}
                                placeHolder={lang.dict.get('fieldWebsiteUrl')}
                            />
                        </div>
                        <div className='input-container'>
                            <p>{lang.dict.get('linkedInAccount')}
                                <span className="form__optional-text">
                                    {lang.dict.get('fieldOptional')}
                                </span>
                            </p>
                            <Input.Text
                                value={vm.marketing.linkedIn}
                                onChange={x => vm.setMarketingOf(E.MarketingService.linkedIn, x)}
                                placeHolder={lang.dict.get('fieldWebsiteUrl')}
                            />
                        </div>

                        <div className='input-container'>
                            <p>{lang.dict.get('twitterAccount')}
                                <span className="form__optional-text">
                                    {lang.dict.get('fieldOptional')}
                                </span>
                            </p>
                            <Input.Text
                                value={vm.marketing.twitter}
                                onChange={x => vm.setMarketingOf(E.MarketingService.twitter, x)}
                                placeHolder={lang.dict.get('fieldWebsiteUrl')}
                            />
                        </div>
                        <div className='input-container'>
                            <p>{lang.dict.get('otherMarketingPlatform')}
                                <span className="form__optional-text">
                                    {lang.dict.get('fieldOptional')}
                                </span>
                            </p>
                            <Input.Text
                                value={vm.marketing.other}
                                onChange={x => vm.setMarketingOf(E.MarketingService.other, x)}
                                placeHolder={lang.dict.get('fieldWebsiteUrl')}
                            />
                        </div>
                        {/* <Input.Text
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
                        /> */}
                    </div>
                </div>
                <div className="form__btns">
                    {buttons}
                </div>
            </form >
        </div >
    );
});
