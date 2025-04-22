import { observer } from 'mobx-react';
import { lang } from '~/api';
import { Button } from '~/bits';
import { hook } from '~/utils';
import type { PmModuleVm } from '../PmModule.vm';

type Props = {
    vm: PmModuleVm;
};

export const RightSidePanel = observer((props: Props) => {
    const isMobile = hook.useIsMobile();

    const isOpen = isMobile || props.vm.rightPanel.isOpen;

    return (
        <div className="right-side-panel" data-is-open={isOpen}>
            <div className="top-section">
                <div className="top-section__header">
                    <Button
                        color="blue"
                        leftImg="tools-icon"
                        onClick={props.vm.rightPanel.toggle}
                        value={lang.dict.get('tools')}
                    />
                </div>
                <div className="top-section__btns">
                    <Button
                        color="transparent"
                        leftImg="client-observations"
                        value={lang.dict.get('addObservation')}
                        onClick={() => props.vm.openObservationModal()}
                    />
                    <Button
                        color="transparent"
                        leftImg="meetings"
                        value={lang.dict.get('meetings')}
                        isDisabled={true}
                    />
                    <Button
                        color="transparent"
                        leftImg="variation-orders"
                        value={lang.dict.get('variationOrders')}
                        isDisabled={true}
                    />
                    <Button
                        color="transparent"
                        leftImg="resolve-disputes"
                        value={lang.dict.get('resolveDisputes')}
                        isDisabled={true}
                    />
                </div>
            </div>
            <div className="bottom-section">
                <Button
                    color="transparent"
                    leftImg="contractor"
                    value={lang.dict.get('contractorReview')}
                    isDisabled={true}
                />
                <Button
                    color="transparent"
                    leftImg="consultant"
                    value={lang.dict.get('consultantReview')}
                    isDisabled={true}
                />
                <div className="btn-settings">
                    <Button
                        color="transparent"
                        leftImg="settings"
                        value={lang.dict.get('projectSettings')}
                        isDisabled={true}
                    />
                </div>
                <div className="btn-contract">
                    <Button
                        color="transparent"
                        leftImg="note"
                        value={lang.dict.get('viewContract')}
                        onClick={props.vm.goToContract}
                    />
                </div>
            </div>
        </div>
    );
});
