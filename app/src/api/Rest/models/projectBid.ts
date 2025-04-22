import { E, enums, Id, Mobx, T, type dtos } from '~/api';
import {
    ProjectBid,
    ProjectBidCost,
    ProjectBidCostItem,
    type Project,
} from '~/models';
import { toInternalStagePart } from './stagePart';

type InternalProjectBidProp =
    | dtos.contract.ContractBidDto
    | dtos.construction.ProjectBidDto;

type InternalProjectBidCostProp =
    | dtos.contract.ContractBidCostDto
    | dtos.construction.ProjectBidCostDto;

type InternalProjectBidCostItemProp =
    | dtos.contract.ContractBidCostItemDto
    | dtos.construction.ProjectBidCostItemDto;

export const toInternalProjectBid = (project: Project, x: InternalProjectBidProp) => {
    const projectBid = new ProjectBid(project);

    Mobx.extendsObservable(projectBid, {
        id: Id.init(x.id, 'external'),
        contractorId: Id.tryInit(x.contractorId, 'external'),
        message: x.message,
        totalDays: x.totalDays,
        totalPrice: x.totalPrice,
        turnkeyItemsTotalPrice: x.turnkeyItemsTotalPrice,
        numberOfCurrentProjects: x.numberOfCurrentProjects,
        structureItemsTotalPrice: x.structureItemsTotalPrice,
        bidCosts: x.bidCosts?.map(item => toInternalBidCost(projectBid, item)),
    });

    // Construction
    if ('projectId' in x) {
        const stageParts = x.stageParts?.map(item => toInternalStagePart(item, projectBid));

        const totalDays = stageParts?.flatMap(part => part.totalDays).reduce((a, b) => a + b, 0);

        Mobx.extendsObservable(projectBid, {
            projectId: Id.tryInit(x.projectId, 'external'),
            bidStatus: T.create(x.bidStatus, enums.BidStatus.castToInternal),
            stageParts: stageParts,
        });

        Mobx.extendsObservable(projectBid.contractor, {
            ongoingProjects: x.numberOfCurrentProjects,
        });

        if (x.bidCosts?.length) {
            Mobx.extendsObservable(projectBid, {
                totalDays: totalDays,
            });
        }
    }

    // Contract
    if ('contractId' in x) {
        Mobx.extendsObservable(projectBid, {
            contractId: Id.tryInit(x.contractId, 'external'),
        });
    }

    return projectBid;
};

const toInternalBidCost = (projectBid: ProjectBid, x: InternalProjectBidCostProp) => {
    const projectBidCost = new ProjectBidCost(projectBid);

    Mobx.extendsObservable(projectBidCost, {
        id: Id.init(x.id, 'external'),
        bidId: Id.tryInit(x.bidId, 'external'),
        isRawValueView: x.rials,
        totalPrice: x.totalPrice,
        costItems: x.costItems?.map(item => toInternalBidCostItem(projectBidCost, item)),
    });

    // Construction
    if ('constructionType' in x) {
        Mobx.extendsObservable(projectBidCost, {
            constructionType: T.create(
                x.constructionType,
                enums.ConstructionType.castToInternal,
            ),
        });
    }

    // Contract
    if ('costType' in x) {
        Mobx.extendsObservable(projectBidCost, {
            constructionType: T.create(
                x.costType,
                enums.ConstructionType.castToInternal,
            ),
        });
    }

    return projectBidCost;
};

const toInternalBidCostItem = (
    projectBidCost: ProjectBidCost,
    x: InternalProjectBidCostItemProp,
) => {
    const projectBidCostItem = new ProjectBidCostItem(projectBidCost);

    Mobx.extendsObservable(projectBidCostItem, {
        id: Id.init(x.id, 'external'),
        bidCostId: Id.tryInit(x.bidCostId, 'external'),
        name: x.name,
        price: x.price,
        quantity: x.quantity,
        translationKey: x.translationKey,
        quantityUnit: x.quantityUnit === 'm2'
            ? E.QuantityUnits.m2
            : E.QuantityUnits.tons,
    });

    return projectBidCostItem;
};
