import { observer } from 'mobx-react';
import { lang } from '~/api';
import { ChecklistCard } from '~/bits';

type Props = {
    bankOnClick?: () => void;
    insureOnClick?: () => void;
    materialOnClick?: () => void;
};

export const ServicesReview = observer((props: Props) => (
    <>
        <div className="services-tip">
            {lang.dict.get('reviewingServicesTip')}
        </div>
        <div className="cards">
            <ChecklistCard
                title={lang.dict.get('reviewingCardInsureTitle')}
                optionalTopTitle={lang.dict.get('reviewingCardComingSoon')}
                subtitle={lang.dict.get('reviewingCardInsureSubtitle')}
                picture="insureHome"
                checklist={[
                    lang.dict.get('reviewingCardInsureFeature1'),
                    lang.dict.get('reviewingCardInsureFeature2'),
                    lang.dict.get('reviewingCardInsureFeature3'),
                ]}
                by={lang.dict.get('reviewingCardInsureBy')}
                byLogo="omanInsurance"
                buttonName={lang.dict.get('reviewingCardInsureAction')}
                onClickButton={props.insureOnClick}
            />
            <ChecklistCard
                title={lang.dict.get('reviewingCardMaterialTitle')}
                optionalTopTitle={lang.dict.get('reviewingCardComingSoon')}
                subtitle={lang.dict.get('reviewingCardMaterialSubtitle')}
                picture="material"
                checklist={[
                    lang.dict.get('reviewingCardMaterialFeature1'),
                    lang.dict.get('reviewingCardMaterialFeature2'),
                    lang.dict.get('reviewingCardMaterialFeature3'),
                    lang.dict.get('reviewingCardMaterialFeature4'),
                ]}
                by={lang.dict.get('reviewingCardMaterialBy')}
                byLogo="assas"
                buttonName={lang.dict.get('reviewingCardLoanAction')}
                onClickButton={props.materialOnClick}
            />
            <ChecklistCard
                title={lang.dict.get('reviewingCardLoanTitle')}
                optionalTopTitle={lang.dict.get('reviewingCardComingSoon')}
                subtitle={lang.dict.get('reviewingCardLoanSubtitle')}
                picture="loan"
                checklist={[
                    lang.dict.get('reviewingCardLoanFeature1'),
                    lang.dict.get('reviewingCardLoanFeature2'),
                    lang.dict.get('reviewingCardLoanFeature3'),
                ]}
                by={lang.dict.get('reviewingCardLoanBy')}
                byLogo="bank"
                buttonName={lang.dict.get('reviewingCardLoanAction')}
                onClickButton={props.bankOnClick}
            />
        </div>
    </>
));
