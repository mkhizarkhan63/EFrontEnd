import { observer } from 'mobx-react';
import { type Id, lang } from '~/api';
import { If, SliderSimple } from '~/bits';

type Contractor = {
    profileId: Id;
    name: string;
    price: number;
    structuralPrice: number;
    additionalPrice: number;
    constructionTime: string;
};

export type ContractorsSummaryProps = {
    contractors: Contractor[];
    myProfileId?: Id;
    areAllBidsSubmitted: boolean;
    winContractorId?: Id;
};

export const ContractorsBidTable = observer((props: ContractorsSummaryProps) => {
    const { contractors, myProfileId, areAllBidsSubmitted, winContractorId } = props;

    const contractorsBoxes = contractors.map((item, j) => ({
        id: item.profileId,
        component: () => (
            <div
                key={item.profileId.asStr()}
                data-is-win={item.profileId.isEqual(winContractorId)}
                className="table__contractor"
            >
                <If condition={item.profileId.isEqual(myProfileId)}>
                    <p className="table__contractor-row table__contractor-row--my-bid">
                        {lang.dict.get('myBid')}
                    </p>
                </If>
                <If condition={!item.profileId.isEqual(myProfileId)}>
                    <p className="table__contractor-row table__contractor-row--contractor">
                        {item.name} {j + 1}
                        <span>{lang.dict.get('bid')}</span>
                    </p>
                </If>
                <p className="table__contractor-row table__contractor-row--price">
                    {item.price}
                    <span className="table__contractor-unit">{lang.dict.get('fieldOmr')}</span>
                </p>
                <p className="table__contractor-row">
                    {item.structuralPrice}
                    <span className="table__contractor-unit">{lang.dict.get('fieldOmr')}</span>
                </p>
                <p className="table__contractor-row">
                    {item.additionalPrice}
                    <span className="table__contractor-unit">{lang.dict.get('fieldOmr')}</span>
                </p>
                <p className="table__contractor-row table__contractor-row--time">
                    {item.constructionTime}
                </p>
            </div>
        ),
    }));

    return (
        <div className="table table--bid-contractors">
            <If condition={!areAllBidsSubmitted}>
                <p className="table__top">{lang.dict.get('contractorsBidsAreSubmitted')}</p>
            </If>
            <div className="table__bottom" data-is-all-bids-submitted={areAllBidsSubmitted}>
                <div className="table__header">
                    <p className="table__row table__row--contractors">{lang.dict.get('contractors')}</p>
                    <p className="table__row table__row--price">{lang.dict.get('price')}</p>
                    <p className="table__row">{lang.dict.get('structuralPrice')}</p>
                    <p className="table__row">{lang.dict.get('additionalPrice')}</p>
                    <p className="table__row">{lang.dict.get('constructionTime')}</p>
                </div>
                <div className="table__body">
                    <SliderSimple list={contractorsBoxes} />
                </div>
            </div>
        </div>
    );
});

