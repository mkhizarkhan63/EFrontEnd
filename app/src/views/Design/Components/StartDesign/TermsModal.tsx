import { lang } from '~/api';
import { Icons } from '~/bits';

type Props = {
    onClose: () => void;
};

export const TermsAndConditions = (props: Props) => (
    <div className="terms-bg">
        <div className="terms">
            <Icons icon="close" remove={props.onClose} />
            <h1>{lang.dict.get('clientTermsAndConditionsForDesign')}</h1>
            <div className="terms__content">
                <h3>{lang.dict.get('clientResponsibility')}</h3>
                <p>{lang.dict.get('clientAcknowledgesAndAgree')}</p>
                <p>{lang.dict.get('clientShallSubmitTheRequest')}</p>
                <p>{lang.dict.get('clientConfirmsThatTheProperty')}</p>
                <p>{lang.dict.get('postSubmissionOfTheRequest')}</p>
                <p>{lang.dict.get('clientUnderstandsAndAgreesThatUntil')}</p>
                <p>{lang.dict.get('postPaymentOfTheAdvanceFees')}</p>
                <p>{lang.dict.get('clientAgreesAndAcknowledgesThatAllWrittenSuggestions')}</p>
                <p>{lang.dict.get('inTtheCircumstanceOfRequests')}</p>
                <p>{lang.dict.get('iInCaseAnyAdditionalFees')}</p>
                <p>{lang.dict.get('clientAgreesThatAllAdditionalFees')}</p>
                <p>{lang.dict.get('anyVerbalCommunicationOfPreferences')}</p>
                <p>{lang.dict.get('postNotificationOneBinaaPlatform')}</p>
                <p>{lang.dict.get('theHandoverAndTransferOfMunicipality')}</p>
                <p>{lang.dict.get('theClientIsProhibited')}</p>
                <p>{lang.dict.get('table1')}</p>
                <table>
                    <tr>
                        <th>{lang.dict.get('paymentCategory')}</th>
                        <th>{lang.dict.get('dueDescription')}</th>
                        <th>{lang.dict.get('methodOfPayment')}</th>
                    </tr>
                    <tr>
                        <td>{lang.dict.get('advanceFeeOfTheDesign')}</td>
                        <td>{lang.dict.get('postAcceptanceOfeBinaaToClient')}</td>
                        <td>{lang.dict.get('bankTransferToeBinaa')}</td>
                    </tr>
                    <tr>
                        <td>{lang.dict.get('additionalFees')}</td>
                        <td>{lang.dict.get('postExplanatorySession')}</td>
                        <td>{lang.dict.get('bankTransferToeBinaa')}</td>
                    </tr>
                    <tr>
                        <td>{lang.dict.get('finalFeeOfTheDesign')}</td>
                        <td>{lang.dict.get('postCompletionOfDetailedDesign')}</td>
                        <td>{lang.dict.get('bankTransferToeBinaa')}</td>
                    </tr>
                    <tr>
                        <td>{lang.dict.get('municipalityFeesDesign')}</td>
                        <td>{lang.dict.get('feesRequestedByTheMunicipality')}</td>
                        <td>{lang.dict.get('bankTransferToeBinaa')}</td>
                    </tr>
                </table>
                <h3>{lang.dict.get('paymentTermsDesign')}</h3>
                <p>{lang.dict.get('allPaymentsAssociated')}<br />
                    {lang.dict.get('nameOfBankAndBranch')}<br />
                    {lang.dict.get('accountNumberDesign')}<br />
                    {lang.dict.get('sortCode')}<br />
                </p>
                <p>{lang.dict.get('inAavoidanceOfDoubt')}</p>
                <p>{lang.dict.get('clientUnderstandsAndAgreesThat10')}</p>
                <h3>{lang.dict.get('communicationAndNotices')}</h3>
                <p>
                    {lang.dict.get('theClientAgreesAndAcknowledgesAuthorizedMethod')}&nbsp;
                    <a href="mailto:info@ebinaa.com">info@ebinaa.com</a>.&nbsp;
                    {lang.dict.get('theClientUnderstandsOtherInteraction')}
                </p>
                <h3>{lang.dict.get('definitions')}</h3>
                <table>
                    <tr>
                        <td>“{lang.dict.get('competentAuthority')}” </td>
                        <td>{lang.dict.get('meansaGovernment')}</td>
                    </tr>
                    <tr>
                        <td>“{lang.dict.get('confidentialInformation')}” </td>
                        <td>{lang.dict.get('meansAllInformationNotLimitedTo')}</td>
                    </tr>
                    <tr>
                        <td>“{lang.dict.get('designPackage')}” </td>
                        <td>{lang.dict.get('meansAllSesignsOfVariousLevels')}</td>
                    </tr>
                    <tr>
                        <td>“{lang.dict.get('designPackageFee')}” </td>
                        <td>{lang.dict.get('theFeeSetOnThePlatform')}</td>
                    </tr>
                    <tr>
                        <td>{lang.dict.get('eBinaaConstructionContract')}</td>
                        <td>{lang.dict.get('meansTheStandardDraft')}</td>
                    </tr>
                    <tr>
                        <td>“{lang.dict.get('initialDesign')}” </td>
                        <td>{lang.dict.get('meansTheFirstDesign')}</td>
                    </tr>
                    <tr>
                        <td>“{lang.dict.get('initialFee')}” </td>
                        <td>{lang.dict.get('meansTheAdvancedPayment')}</td>
                    </tr>
                    <tr>
                        <td>“{lang.dict.get('krookie')}” </td>
                        <td>{lang.dict.get('verifiedDocumentByMinistry')}</td>
                    </tr>
                    <tr>
                        <td>“{lang.dict.get('mociip')}” </td>
                        <td>{lang.dict.get('meansMinistryOfCommerce')}</td>
                    </tr>
                    <tr>
                        <td>“{lang.dict.get('municipalityFeesDesign')}” </td>
                        <td>{lang.dict.get('feesImposedByCompetentAuthority')}</td>
                    </tr>
                    <tr>
                        <td>“{lang.dict.get('property')}” </td>
                        <td>{lang.dict.get('landPlotUponWwhichTheDesign')}</td>
                    </tr>
                    <tr>
                        <td>{lang.dict.get('projectOrArchitecturalProject')}</td>
                        <td>{lang.dict.get('meansTheProcessOfDesignDevelopment')}</td>
                    </tr>
                    <tr>
                        <td>“{lang.dict.get('service')}” </td>
                        <td>{lang.dict.get('architecturalAndOrArchitecturalAndOnSite')}</td>
                    </tr>
                    <tr>
                        <td>“{lang.dict.get('schematicDesign')}” </td>
                        <td>{lang.dict.get('overviewSketchDetailing')}</td>
                    </tr>
                    <tr>
                        <td>“{lang.dict.get('specifications')}” </td>
                        <td>{lang.dict.get('materialTestingAndInspection')}</td>
                    </tr>
                    <tr>
                        <td>“{lang.dict.get('subscriptionFee')}” </td>
                        <td>{lang.dict.get('amountPaidToBeEnrolled')}</td>
                    </tr>
                    <tr>
                        <td>“{lang.dict.get('threeDimensionalDesign')}” </td>
                        <td>{lang.dict.get('meansTheDesignPrototyping')}</td>
                    </tr>
                    <tr>
                        <td>“{lang.dict.get('valueAddedTax')}” </td>
                        <td>{lang.dict.get('meansConsumptionTax')}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
);
