import { action, makeAutoObservable } from 'mobx';
import { E, ErrorListHolder, lang, restQuery, T, utils } from '~/api';
import { Governorate, Wilayat } from '~/models';
import { stores } from '~/stores';

const struct = () => T.type({
    governorate: T.instance(Governorate),
    wilayat: T.instance(Wilayat),
    landArea: T.min(T.number(), 100),
    landType: T.enums(Object.values(E.ConstructionLand)),
    krookieFiles: T.files(),
    addedBuiltUpArea: T.min(T.number(), 1),
    drawingsFiles: T.files(),
});

export enum Quality {
    lowCost = 'lowCost',
    standard = 'standard',
    highEnd = 'highEnd',
}

export enum MoveIn {
    asSoon = 'asSoon',
    afterYear = 'afterYear',
    afterTwoYears = 'afterTwoYears',
}

export class BuildTabVm {
    isEstimating = false;

    supervisionPrice = 0;

    constructionRate = 0;

    buildupArea = 0;

    quality? = Quality.standard;

    budget?: number;

    moveIn = MoveIn.asSoon;

    isCalculated = false;

    constructor() {
        makeAutoObservable(this, {
            switchIsEstimating: action,
            setQuality: action,
            changeMoveIn: action,
        });
    }

    errorListHolder = new ErrorListHolder(
        () => this.validationData,
        () => struct(),
    );

    get moveInValues() {
        return Object.values(MoveIn).map(item => ({
            id: item,
            name: lang.dict.get(item),
            value: this.moveIn === item,
        }));
    }

    get supervisionTotal() {
        return this.supervisionPrice * 12;
    }

    get constructionTotal() {
        return Math.floor((95 / 100) * (this.budget ?? 0 - this.supervisionTotal));
    }

    get preference() {
        if (!this.quality) {
            if (this.supervisionPrice === 100 && this.constructionRate >= 100 && this.constructionRate < 180) {
                return Quality.lowCost;
            }

            if (this.supervisionPrice === 200 && this.constructionRate >= 180 && this.constructionRate < 240) {
                return Quality.standard;
            }

            if (this.supervisionPrice === 300 && this.constructionRate >= 240 && this.constructionRate <= 300) {
                return Quality.highEnd;
            }

            return undefined;
        }

        return this.quality;
    }

    get preferenceValues() {
        return Object.values(Quality).map(item => ({
            id: item,
            name: lang.dict.get(item),
            value: this.preference === item,
            img: item,
        }));
    }

    get initialConstructionTotal() {
        if (!this.budget) {
            return 0;
        }

        return Math.floor(((95 / 100) * this.budget) - this.supervisionTotal);
    }

    get initialConstructionRate() {
        return (this.minimumRate + this.maximumRate) / 2;
    }

    get initialBuildupArea() {
        const area = Math.floor(this.initialConstructionTotal / this.initialConstructionRate);

        return area < 0 ? 0 : area;
    }

    get minimumRate() {
        switch (this.quality) {
            case Quality.highEnd:
                return this.moveIn === MoveIn.asSoon ? 240 : 240 + ((240 / 100) * this.percentIncrase);
            case Quality.standard:
                return this.moveIn === MoveIn.asSoon ? 180 : 180 + ((180 / 100) * this.percentIncrase);
            case Quality.lowCost:
                return this.moveIn === MoveIn.asSoon ? 150 : 150 + ((150 / 100) * this.percentIncrase);
            default:
                return 180;
        }
    }

    get maximumRate() {
        switch (this.quality) {
            case Quality.highEnd:
                return this.moveIn === MoveIn.asSoon ? 300 : 300 + ((300 / 100) * this.percentIncrase);
            case Quality.standard:
                return this.moveIn === MoveIn.asSoon ? 240 : 240 + ((240 / 100) * this.percentIncrase);
            case Quality.lowCost:
                return this.moveIn === MoveIn.asSoon ? 180 : 180 + ((180 / 100) * this.percentIncrase);
            default:
                return 240;
        }
    }

    get initialSupervisionPrice() {
        switch (this.quality) {
            case Quality.highEnd:
                return this.moveIn === MoveIn.asSoon ? 300 : 300 + ((300 / 100) * this.percentIncrase);
            case Quality.standard:
                return this.moveIn === MoveIn.asSoon ? 200 : 200 + ((200 / 100) * this.percentIncrase);
            case Quality.lowCost:
                return this.moveIn === MoveIn.asSoon ? 100 : 100 + ((100 / 100) * this.percentIncrase);
            default:
                return 200;
        }
    }

    get percentIncrase() {
        switch (this.moveIn) {
            case MoveIn.asSoon:
                return 1;
            case MoveIn.afterYear:
                return 10;
            case MoveIn.afterTwoYears:
                return 15;
            default:
                return 0;
        }
    }

    get draft() {
        return stores.projects.draft;
    }

    get validationData() {
        return {
            governorate: this.draft.governorate,
            wilayat: this.draft.wilayat,
            landArea: this.draft.landArea,
            landType: this.draft.landType,
            addedBuiltUpArea: this.draft.addedBuiltUpArea,
            constructionType: this.draft.constructionType,
            startingStep: this.draft.startingStep,
            drawingsFiles: this.draft.drawingsFiles,
            krookieFiles: this.draft.krookieFiles,
        };
    }

    submitProject = async () => {
        if (!this.errorListHolder.test()) {
            return;
        }

        this.draft.toggleProjectStartingStep();

        const projectId = await restQuery.project.postProject(this.draft);

        if (!projectId) {
            return;
        }

        this.draft.id.set(projectId, 'external');

        const updateId = await stores.projects.update(this.draft, true);

        if (!updateId) {
            return;
        }

        stores.display.router.$.project.$.sub.$.details.go({ id: projectId });
    };

    switchIsEstimating = () => {
        this.isEstimating = !this.isEstimating;
    };

    setQuality = (quality: Quality) => {
        this.quality = quality;
    };

    setBudget = (value: string) => {
        this.budget = utils.fromInputNumber(value);
    };

    changeMoveIn = (value: MoveIn) => {
        this.moveIn = value;
    };

    makeCalculations = () => {
        if (!this.budget) {
            return;
        }

        this.constructionRate = this.initialConstructionRate;
        this.supervisionPrice = this.initialSupervisionPrice;
        this.buildupArea = this.initialBuildupArea;
        this.isCalculated = true;
        this.quality = undefined;
    };

    changeBuildupArea = (value: string) => {
        this.buildupArea = Math.floor(utils.fromInputNumber(value));
        this.constructionRate = Math.floor(this.constructionTotal / utils.fromInputNumber(value));
    };

    changeConstructionRate = (value: string) => {
        this.constructionRate = Math.floor(utils.fromInputNumber(value));
        this.buildupArea = Math.floor(this.constructionTotal / utils.fromInputNumber(value));
    };

    changeSupervisionPrice = (value: string) => {
        this.supervisionPrice = utils.fromInputNumber(value);
    };
}
