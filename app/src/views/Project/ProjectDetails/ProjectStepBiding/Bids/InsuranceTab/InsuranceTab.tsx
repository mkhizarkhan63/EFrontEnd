import { lang } from '~/api';

export const InsuranceTab = () => (
    <div className="insurance">
        <p className="insurance__info">{lang.dict.get('insuranceInfo')}</p>
        <div className="insurance__content">
            <div className="insurance__box">
                <div className="insurance__box-top">
                    <img src="/assets/graphics/construction_risk.jpg" alt="" className="insurance__box-img" />
                    <p className="insurance__box-title">{lang.dict.get('constructionRisk')}</p>
                    <p className="insurance__box-years">2 {lang.dict.get('years')}</p>
                </div>
                <p className="insurance__box-list-title">{lang.dict.get('constructionRiskInfo')}</p>
                <ul className="insurance__box-list">
                    <li className="insurance__box-list-item">{lang.dict.get('theftAndBurglary')}</li>
                    <li className="insurance__box-list-item">{lang.dict.get('failureOfTemporary')}</li>
                    <li className="insurance__box-list-item">{lang.dict.get('firesAndElectricShocks')}</li>
                    <li className="insurance__box-list-item">{lang.dict.get('naturalDisasters')}</li>
                    <li className="insurance__box-list-item">{lang.dict.get('negligenceAtSite')}</li>
                </ul>
                <div className="insurance__box-policy">
                    <div className="insurance__box-policy-item">
                        <p className="insurance__box-policy-title">
                            {lang.dict.get('policyPremium')}
                        </p>
                        <p className="insurance__box-policy-value">
                            {lang.dict.format('omrFormat', ['500'])}
                        </p>
                    </div>
                    <div className="insurance__box-policy-item">
                        <p className="insurance__box-policy-title">
                            {lang.dict.get('policyCoverage')}
                        </p>
                        <p className="insurance__box-policy-value insurance__box-policy-value--green">
                            {lang.dict.format('omrFormat', ['65,000'])}
                        </p>
                    </div>
                </div>
                <div className="insurance__box-row">
                    <p className="insurance__box-text insurance__box-text--min">
                        {lang.dict.get('minimumClaimAmount')}&nbsp;&nbsp;
                        <span className="insurance__box-text insurance__box-text--bold">
                            {lang.dict.format('omrFormat', ['1000'])}
                        </span>
                    </p>
                    <p className="insurance__box-text insurance__box-text--details">{lang.dict.get('policyDetails')}</p>
                </div>
                <p className="insurance__box-contact">{lang.dict.get('policyContactAdmin')}</p>
            </div>
            <div className="insurance__box">
                <div className="insurance__box-top">
                    <img src="/assets/graphics/insure_home.jpg" alt="" className="insurance__box-img" />
                    <p className="insurance__box-title">{lang.dict.get('professionalIndemnity')}</p>
                    <p className="insurance__box-years">10 {lang.dict.get('years')}</p>
                </div>
                <p className="insurance__box-list-title">{lang.dict.get('professionalIndemnityInfo')}</p>
                <ul className="insurance__box-list">
                    <li className="insurance__box-list-item">{lang.dict.get('negligenceContractor')}</li>
                    <li className="insurance__box-list-item">{lang.dict.get('negligenceConsultant')}</li>
                    <li className="insurance__box-list-item">{lang.dict.get('poorQualityWorkmanship')}</li>
                    <li className="insurance__box-list-item">{lang.dict.get('poorQualityMaterials')}</li>
                </ul>
                <div className="insurance__box-policy">
                    <div className="insurance__box-policy-item">
                        <p className="insurance__box-policy-title">
                            {lang.dict.get('policyPremium')}
                        </p>
                        <p className="insurance__box-policy-value">
                            {lang.dict.format('omrFormat', ['2500'])}
                        </p>
                    </div>
                    <div className="insurance__box-policy-item">
                        <p className="insurance__box-policy-title">
                            {lang.dict.get('policyCoverage')}
                        </p>
                        <p className="insurance__box-policy-value insurance__box-policy-value--green">
                            {lang.dict.format('omrFormat', ['65,000'])}
                        </p>
                    </div>
                </div>
                <div className="insurance__box-row">
                    <p className="insurance__box-text insurance__box-text--min">
                        {lang.dict.get('minimumClaimAmount')}&nbsp;&nbsp;
                        <span className="insurance__box-text insurance__box-text--bold">
                            {lang.dict.format('omrFormat', ['2500'])}
                        </span>
                    </p>
                    <p className="insurance__box-text insurance__box-text--details">{lang.dict.get('policyDetails')}</p>
                </div>
                <p className="insurance__box-contact">{lang.dict.get('policyContactAdmin')}</p>
            </div>
        </div>
        <div className="insurance__provided">
            <p className="insurance__provided-text">{lang.dict.get('insuranceProvidedBy')}</p>
            <img src="/assets/graphics/insurance.jpeg" alt="" className="insurance__provided-img" />
        </div>
    </div>
);
