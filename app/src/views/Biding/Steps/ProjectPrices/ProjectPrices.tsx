import { observer } from 'mobx-react';
import { E, lang, utils } from '~/api';
import { Button, ErrorList, If, Input, SortedTable } from '~/bits';
import type { ProjectBidCost, ProjectBidCostItem } from '~/models';
import { utilsNumber } from '~/utils';
import type { BidingVm } from '../../Biding.vm';
import { Price } from '../../Components';

type Props = {
    vm: BidingVm;
    type: E.ConstructionType;
};

const getColumns = (bidCost: ProjectBidCost, vm: BidingVm) => SortedTable.createColumns<ProjectBidCostItem>(
    () => [
        {
            keyName: 'itemhash',
            displayName: lang.dict.get('itemhash'),
            size: .5,
            render: (item, index) => <div>{index + 1}</div>,
        },
        {
            keyName: 'item',
            displayName: lang.dict.get('item'),
            size: 5,
            render: item => (
                <div className="name">
                    <Input.Text
                        onChange={vm.changeInput(item.changeName)}
                        value={item.name}
                    />
                </div>
            ),
        },
        {
            keyName: 'quantity',
            displayName: lang.dict.get('quantity'),
            size: 2.35,
            align: 'left' as const,
            render: item => (
                <Input.TextAndSelect
                    textValue={utils.toInputNumber(item.quantity)}
                    selectValue={item.quantityUnit}
                    selectValues={item.quantityUnits}
                    textOnChange={vm.changeInput(item.setQuantity)}
                    selectOnChange={vm.changeInput(item.setQuantityUnit)}
                />
            ),
        },
        {
            keyName: 'costOmr',
            displayName: lang.dict.get('costOmr'),
            size: 1.65,
            align: 'right' as const,
            render: item => (
                <Input.Text
                    onChange={vm.changeInput(item.setPrice)}
                    value={utils.toInputNumber(item.price)}
                />
            ),
        },
        {
            keyName: 'action',
            displayName: lang.dict.get('subscriptionInvoicesAction'),
            size: 0,
            align: 'right' as const,
            render: item => (
                <Button
                    color="white"
                    isCircle={true}
                    centerImg="close"
                    onClick={bidCost.removeItem(item.id)}
                />
            ),
        },
    ]);

const Section = observer(({ vm, type }: Props) => {
    const { bid } = vm.project.forContractor;

    const part = type === E.ConstructionType.structureOnly
        ? bid?.structureOnly
        : bid?.turnKey;

    if (!part || type === E.ConstructionType.none) {
        return null;
    }

    const filteredColumns = () => {
        const columns = getColumns(part, vm);

        if (!vm.isEditable) {
            return columns.filter(x => x.keyName !== 'action');
        }

        return columns;
    };

    const title = lang.dict.get(type === E.ConstructionType.structureOnly
        ? 'structureProjectPrice'
        : 'turnkeyProjectPrice',
    );

    const description = lang.dict.get(type === E.ConstructionType.structureOnly
        ? 'descriptionStructure'
        : 'descriptionTurnKey',
    );

    const subTitle = lang.dict.get(type === E.ConstructionType.structureOnly
        ? 'recordYourStructureCost'
        : 'recordYourTurnKeyItems',
    );

    const isClosed = type === E.ConstructionType.structureOnly
        ? vm.isClosedStructure
        : vm.isClosedTurnKey;

    const closeFn = type === E.ConstructionType.structureOnly
        ? vm.toggleIsClosedStructure
        : vm.toggleIsClosedTurnKey;

    const inputValue = part.isRawValueView
        ? utilsNumber.toCurrency.asNumber(part.totalPrice)
        : utilsNumber.toCurrency.asNumber(part.totalPricePerMeter);

    const viewValue = part.isRawValueView
        ? utilsNumber.toCurrency(part.totalPricePerMeter)
        : utilsNumber.toCurrency(part.totalPrice);

    return (
        <div className="project-prices-item">
            <div className="project-prices-item__header">
                <p className="project__title project__title--main">
                    {title}
                </p>
                <p className="project__sub-title">
                    <p className="project__sub-title-text">
                        {description}
                    </p>
                    <Button
                        color="transparent"
                        value={lang.dict.get('checkScopeOfWorkDetails')}
                        onClick={() => vm.openScopeOfWork(type)}
                    />
                </p>
                <div className="table-toggle">
                    <p className="project-text">
                        {lang.dict.get('rials')}
                    </p>
                    <Input.Checkbox
                        type="toggle"
                        onChange={part.toggleRawValueView}
                        isChecked={!part.isRawValueView}
                    />
                    <span className="project-text project-text--unit">
                        {lang.dict.get('omrM2')}
                    </span>
                    <Input.Text
                        onChange={vm.changeInput(part.setPrice)}
                        value={utils.toInputNumber(inputValue)}
                    />
                    <span className="project-text">
                        <If condition={() => !part.isRawValueView}>
                            {viewValue} {lang.dict.get('fieldOmr')}
                        </If>
                        <If condition={() => part.isRawValueView}>
                            {viewValue} {lang.dict.get('omrM2')}
                        </If>
                    </span>
                    <div className="price-info">
                        {lang.dict.get('biddingVat')}
                    </div>
                </div>
            </div>
            <div className="project-prices-item__optional">
                <div className="project-prices-item__optional-left">
                    <p className="project__title project__title--sub">
                        {subTitle}
                        <span> {lang.dict.get('fieldOptional')}</span>
                    </p>
                    <p className="project__sub-title project__sub-title--sub">
                        {lang.dict.get('onlyForEbinaaInternal')}
                    </p>
                </div>
                <div className="project-prices-item__optional-right">
                    <span
                        className="project-text project-text--hidden"
                        data-is-closed={isClosed}
                    >
                        {part.itemTotalPrice} {lang.dict.get('fieldOmr')}
                    </span>
                    <div
                        className="project-prices-item__btn-tick"
                        data-is-closed={isClosed}
                    >
                        <Button
                            color="white"
                            isCircle={true}
                            centerImg="dropdown-up"
                            onClick={closeFn}
                        />
                    </div>
                </div>
            </div>
            <div
                className="project-prices-item__form"
                data-is-closed={isClosed}
            >
                <SortedTable
                    data={part.costItems}
                    keyValue="id"
                    columns={filteredColumns()}
                />
                <If condition={vm.isEditable}>
                    <div className="project-prices-item__btn-add">
                        <Button
                            leftImg="add"
                            color="white"
                            hasOutline={true}
                            onClick={part.addItem}
                            value={lang.dict.get('addNewItem')}
                        />
                    </div>
                </If>
            </div>
        </div>
    );
});

export const ProjectPrices = observer(({ vm }: { vm: BidingVm }) => {
    const contractor = vm.project.forContractor;

    if (!contractor.bid?.structureOnly) {
        return null;
    }

    return (
        <div className="project project-prices">
            <ErrorList errors={vm.errorListHolder} />
            <div className="project-left">
                <Section vm={vm} type={E.ConstructionType.structureOnly} />
                <If condition={() => Boolean(contractor.bid?.turnKey)}>
                    <Section vm={vm} type={E.ConstructionType.turnKey} />
                </If>
            </div>
            <div className="project-right">
                <Price vm={vm} />
                <p className="project-right__review">{lang.dict.get('reviewTheDocuments')}</p>
                <div className="project-right__btn">
                    <If condition={vm.isEditable}>
                        <Button
                            color="blue"
                            rightImg="next"
                            value={lang.dict.get('save')}
                            onClick={vm.save}
                        />
                    </If>
                    <Button
                        color="blue"
                        rightImg="next"
                        onClick={vm.goNextStep}
                        value={lang.dict.get('goNext')}
                    />
                </div>
            </div>
        </div>
    );
},
);
