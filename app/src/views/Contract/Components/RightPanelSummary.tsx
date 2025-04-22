import { observer } from 'mobx-react';
import { useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { E, Env, lang } from '~/api';
import { Button, If } from '~/bits';
import type { ContractVm } from '../Contract.vm';

type Props = {
    vm: ContractVm;
};

type PillsProps = {
    isClient: boolean;
    isContractor: boolean;
    isConsultant: boolean;
};

type CanvasRef = Record<string, (
    fileType?: string,
    useBgImage?: boolean,
    backgroundColor?: string,
) => string>;

export const Signature = observer(({ vm }: Props) => {
    const canvasRef = useRef<CanvasDraw>(null);

    const changeSignature = () => {
        if (!canvasRef.current) {
            return;
        }

        const dataUrl = (canvasRef.current as unknown as CanvasRef).getDataURL();
        vm.setSignature(dataUrl);
    };

    const clearSignature = () => {
        if (!canvasRef.current) {
            return;
        }

        (canvasRef.current as unknown as CanvasRef).clear();
        vm.setSignature();
    };

    return (
        <div className="right-panel__signature">
            <div className="right-panel__signature-header">
                <p className="right-panel__signature-header-text">
                    {lang.dict.get('addSignature')}
                </p>
                <Button
                    color="transparent"
                    value={lang.dict.get('clear')}
                    onClick={clearSignature}
                />
            </div>
            <div className="right-panel__signature-canvas">
                <CanvasDraw
                    brushRadius={0.4}
                    lazyRadius={1}
                    hideGrid={true}
                    enablePanAndZoom={true}
                    onChange={changeSignature}
                    ref={canvasRef}
                />
            </div>
        </div>
    );
});

const Pills = observer((props: PillsProps) => (
    <div className="right-panel-summary__progress-labels">
        <div
            className="right-panel-summary__progress-label"
            data-is-active={props.isClient}
        >
            {lang.dict.get('client')}
        </div>
        <div
            className="right-panel-summary__progress-label"
            data-is-active={props.isContractor}
        >
            {lang.dict.get('contractor')}
        </div>
        <div
            className="right-panel-summary__progress-label"
            data-is-active={props.isConsultant}
        >
            {lang.dict.get('consultant')}
        </div>
    </div>
));

const Progress = observer(({ vm }: Props) => {
    const { contract } = vm;
    return (
        <div className="right-panel-summary__progress">
            <div className="right-panel-summary__progress-step" data-is-active={true}>
                <div className="right-panel-summary__progress-num">1</div>
                <div>
                    <p className="right-panel-summary__progress-title">
                        {lang.dict.get('contractInfo')}
                    </p>
                    <p className="right-panel-summary__progress-desc">
                        {lang.dict.get('waitingForFill')}
                    </p>
                    <Pills
                        isClient={Boolean(contract.getSubject(E.ContractSubjects.client))}
                        isConsultant={Boolean(contract.getSubject(E.ContractSubjects.consultant))}
                        isContractor={Boolean(contract.getSubject(E.ContractSubjects.contractor))}
                    />
                </div>
            </div>
            <div
                className="right-panel-summary__progress-step"
                data-is-active={contract.allSubjects}
            >
                <div className="right-panel-summary__progress-num">2</div>
                <div>
                    <p className="right-panel-summary__progress-title">
                        {lang.dict.get('signContract')}
                    </p>
                    <p className="right-panel-summary__progress-desc">
                        {lang.dict.get('waitingForSign')}
                    </p>
                    <Pills
                        isClient={Boolean(contract.isSigned(E.ContractSubjects.client))}
                        isConsultant={Boolean(contract.isSigned(E.ContractSubjects.consultant))}
                        isContractor={Boolean(contract.isSigned(E.ContractSubjects.contractor))}
                    />
                </div>
            </div>
            <div
                className="right-panel-summary__progress-step"
                data-is-active={contract.allSigned}
            >
                <div className="right-panel-summary__progress-num">3</div>
                <div>
                    <p className="right-panel-summary__progress-title">
                        {lang.dict.get('constructionStarts')}
                    </p>
                </div>
            </div>
        </div>
    );
});

export const RightPanelSummary = observer(({ vm }: Props) => {
    const buttonValue = vm.contract.isSigned()
        ? lang.dict.get('goToProjectManagement')
        : lang.dict.get('signContract');

    const isDisabled = () => {
        if (!vm.contract.allSubjects) {
            return true;
        }

        if (vm.contract.allSigned) {
            return false;
        }

        return vm.contract.isSigned() || !vm.signatureFile.file;
    };

    return (
        <div className="right-panel-summary">
            <div className="right-panel-summary__back-btn">
                <Button
                    leftImg="back"
                    color="white"
                    value={lang.dict.get('signContract')}
                    onClick={vm.goToDetails}
                />
            </div>
            <div className="right-panel-summary__content">
                <Progress vm={vm} />
                <If condition={() => !vm.contract.isSigned() && vm.contract.allSubjects}>
                    <Signature vm={vm} />
                </If>
            </div>
            <If condition={!vm.contract.isSigned() || !Env.getBool('IS_PRODUCTION')}>
                <div className="right-panel-summary__sign-btn">
                    <Button
                        color="green"
                        value={buttonValue}
                        isDisabled={isDisabled()}
                        onClick={vm.signContract}
                        isLoading={vm.isUpdating}
                    />
                </div>
            </If>
        </div>
    );
});
