import { E, Id, utils } from '~/api';
import { ProjectBidContractor, type Project, type ProjectBidCost, type StagePart } from '~/models';

const TEMPLATE_PARTS_ORDER = [
    E.StageTableNames.mobilization,
    E.StageTableNames.structure,
    E.StageTableNames.internalFinishes,
    E.StageTableNames.externalFinishes,
    E.StageTableNames.handover,
    E.StageTableNames.maintenance,
];

export class ProjectBid {
    id = Id.init();

    projectId?: Id;

    contractId?: Id;

    contractorId?: Id;

    bidCosts: ProjectBidCost[] = [];

    stageParts: StagePart[] = [];

    totalPrice = 0;

    structureItemsTotalPrice = 0;

    turnkeyItemsTotalPrice = 0;

    totalDays = 0;

    numberOfCurrentProjects = 0;

    message = '';

    bidStatus?: E.BidStatus;

    contractor = new ProjectBidContractor();

    // Missing variables from api

    badgesType?: E.TopContractorsTypes;

    constructor(readonly project: Project) {
        makeSafeObservable(this, {
            setTotalDays: false,
            setTotalPrice: false,
            setMessage: false,
            setNumberOfCurrentProjects: false,
        });
    }

    get structureOnly() {
        return this.bidCosts
            .find(item => item.constructionType === E.ConstructionType.structureOnly);
    }

    get turnkeyPrice() {
        if (this.turnKey?.totalPrice && this.structureOnly?.totalPrice) {
            return this.turnKey?.totalPrice - this.structureOnly?.totalPrice;
        }

        return this.turnKey?.totalPrice;
    }

    get totalBidPrice() {
        if (!this.turnKey) {
            return this.structureOnly?.totalPrice;
        }

        return this.totalPrice;
    }

    get turnKey() {
        return this.bidCosts
            .find(item => item.constructionType === E.ConstructionType.turnKey);
    }

    get parts() {
        return TEMPLATE_PARTS_ORDER.map(item => this.stageParts
            .find(el => el.planStage === item))
            .filter((x): x is StagePart => Boolean(x));
    }

    setTotalDays = (value: number) => {
        this.totalDays = value;
    };

    setTotalPrice = (value: number) => {
        this.totalPrice = value;
    };

    setMessage = (value: string) => {
        this.message = value;
    };

    setNumberOfCurrentProjects = (value: string) => {
        this.numberOfCurrentProjects = utils.fromInputNumber(value);
    };
}
