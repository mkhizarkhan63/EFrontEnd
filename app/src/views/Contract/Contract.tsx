import { observer } from 'mobx-react';
import { E, lang } from '~/api';
import { ErrorList, If, Subheader } from '~/bits';
import { ContractView, Page } from '~/partials';
import { ContractVm } from './Contract.vm';
import {
    ModifyContractModal,
    RightPanelPricePlan,
    PdfPreview,
    LeftPanel,
    RightPanelDetails,
    RightPanelSummary,
    SubmitPmCommitment,
} from './Components';
import { hook } from '~/utils';
import { LoadingPage } from '../LoadingPage';

type Props = {
    /**
     * Allows hide headers etc around contract
     */
    doRawPrint?: boolean;
};

type RightPanelProps = {
    vm: ContractVm;
};

const RightPanel = observer(({ vm }: RightPanelProps) => {
    switch (vm.step) {
        case E.ContractStep.pricePlan:
            return <RightPanelPricePlan vm={vm} />;
        case E.ContractStep.details:
            return <RightPanelDetails vm={vm} />;
        case E.ContractStep.summary:
            return <RightPanelSummary vm={vm} />;
        default:
            return null;
    }
});

export const Contract = observer((p: Props) => {
    const vm = hook.useVm(() => new ContractVm());

    const centerPanel = vm.pdfUrl ? () => <PdfPreview vm={vm} /> : () => null;

    const plainView = (
        <ContractView
            centerPanel={centerPanel}
            leftPanel={() => <LeftPanel vm={vm} />}
            rightPanel={() => <RightPanel vm={vm} />}
        />
    );

    if (p.doRawPrint === true) {
        return (
            <div className="contractor-bid-contract" data-variant="raw-print">
                {plainView}
            </div>
        );
    }

    return (
        <div className="contract-container-view">
            <If condition={() => vm.isLoading || !vm.isContractDivided}>
                <LoadingPage />
            </If>
            <Page>
                <div className="contractor-bid-contract">
                    <Subheader
                        hasReturnButton={true}
                        returnButton={vm.goBack}
                        pageName={lang.dict.get('subscriptionSignContract')}
                    >
                        <Subheader.Bottom>
                            #{vm.contract.project.projectNumber}
                        </Subheader.Bottom>
                    </Subheader>
                    {plainView}
                </div>
                <If condition={() => vm.isModifyContract}>
                    <ModifyContractModal vm={vm} />
                </If>
                <If condition={() => vm.isSubmitPmCommitment}>
                    <SubmitPmCommitment vm={vm} />
                </If>
                <ErrorList errors={vm.errorListHolder} />
            </Page>
        </div>
    );
});
