import { observer } from 'mobx-react';
import { type BuildTabVm } from './BuildTab.vm';
import { Button, Close, If, Input, SideModal } from '~/bits';
import { lang, utils } from '~/api';
import { toCurrency } from '~/utils/number';

type Props = {
    vm: BuildTabVm;
};

export const EstimateModal = observer(({ vm }: Props) => (
    <SideModal variant="estimate" onBlur={vm.switchIsEstimating}>
        <div className="side-modal__header">
            <Close onClick={vm.switchIsEstimating} />
            <div className="side-modal__header-title">
                {lang.dict.get('getEstimate')}
            </div>
        </div>
        <div className="side-modal__content">
            <div className="side-modal__top">
                <p className="side-modal__title">
                    {lang.dict.get('whatPreference')}
                </p>
                <Input.Multiple
                    type="toggle"
                    values={vm.preferenceValues}
                    onChange={vm.setQuality}
                />
                <div className="side-modal__budget">
                    <p className="side-modal__title">
                        {lang.dict.get('whatBudget')}
                    </p>
                    <Input.Text
                        value={toCurrency(vm.budget, 0)}
                        onChange={vm.setBudget}
                        placeHolder={lang.dict.get('fieldExample')}
                        shouldCursorMove={true}
                    />
                    <p className="side-modal__budget-omr">
                        OMR
                    </p>
                </div>
                <p className="side-modal__title">
                    {lang.dict.get('whenToMove')}
                </p>
                <Input.Multiple
                    type="radio"
                    values={vm.moveInValues}
                    onChange={vm.changeMoveIn}
                />
                <Button
                    color="green"
                    value={lang.dict.get('goCalculate')}
                    rightImg="next"
                    onClick={vm.makeCalculations}
                />
            </div>
            <div className="side-modal__bottom">
                <If condition={vm.isCalculated}>
                    <div className="side-modal__bottom-row">
                        <p className="side-modal__bottom-title">
                            {lang.dict.get('builtUpArea')}
                        </p>
                        <p className="side-modal__bottom-desc">
                            {lang.dict.get('thisIsHowMuch')}
                        </p>
                        <Input.Text
                            onChange={vm.changeBuildupArea}
                            value={utils.toInputNumber(vm.buildupArea)}
                        />
                        <p className="side-modal__bottom-row-unit">
                            {lang.dict.get('squareMeter')}
                        </p>
                    </div>
                    <div className="side-modal__bottom-row construction">
                        <p className="side-modal__bottom-title">
                            {lang.dict.get('construction')}&nbsp;
                            <span>{vm.constructionTotal} OMR</span>
                        </p>
                        <p className="side-modal__bottom-desc">
                            {lang.dict.get('estimatedConstruction')}
                        </p>
                        <Input.Text
                            onChange={vm.changeConstructionRate}
                            value={utils.toInputNumber(vm.constructionRate)}
                        />
                        <p className="side-modal__bottom-row-unit">
                            {lang.dict.get('squareMeterRo')}
                        </p>
                    </div>
                    <div className="side-modal__bottom-row month">
                        <p className="side-modal__bottom-title">
                            {lang.dict.get('supervision')}&nbsp;
                            <span>{vm.supervisionTotal} OMR</span>
                        </p>
                        <p className="side-modal__bottom-desc">
                            {lang.dict.get('consultantFixed')}
                        </p>
                        <Input.Text
                            onChange={vm.changeSupervisionPrice}
                            value={utils.toInputNumber(vm.supervisionPrice)}
                        />
                        <p className="side-modal__bottom-row-unit">
                            {lang.dict.get('roMonth')}
                        </p>
                    </div>
                </If>
            </div>
        </div>
    </SideModal>
));
