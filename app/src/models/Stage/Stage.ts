import { action, makeAutoObservable } from 'mobx';
import { E, ErrorListHolder, Id, Mobx, T } from '~/api';
import { stores } from '~/stores';
import { utilsNumber } from '~/utils';
import { StagePlanConstruction, StagePlanContract, StageTemplate } from '.';
import { StagePart } from '../StagePart';
import { type StageUnit } from '../StageUnit';
import { type Moment } from 'moment';

const struct = (hasItems: PartsWithItems) => {
    const templatePart = {
        items: T.array(
            T.type({
                suggestedPercentage: T.percent('suggestedPercentage'),
                correctNameDesc: T.nameDesc(),
                hasWorkflow: T.literal(true),
            }),
        ),
    };

    const emptyPart = {
        items: T.customError('emptyPartList'),
    };

    return T.type({
        templateName: T.name(),
        mobilization: T.type({ ...hasItems.mobilization ? templatePart : emptyPart }),
        structure: T.type({ ...hasItems.structure ? templatePart : emptyPart }),
        internalFinishes: T.type({ ...hasItems.internalFinishes ? templatePart : emptyPart }),
        externalFinishes: T.type({ ...hasItems.externalFinishes ? templatePart : emptyPart }),
        handover: T.type({ ...hasItems.handover ? templatePart : emptyPart }),
        maintenance: T.type({ ...hasItems.maintenance ? templatePart : emptyPart }),
        parts: T.sumOfPercentages(),
    });
};

type PartsWithItems = {
    none: boolean;
    mobilization: boolean;
    structure: boolean;
    internalFinishes: boolean;
    externalFinishes: boolean;
    handover: boolean;
    maintenance: boolean;
};

type TemplatePart = {
    items: Array<{
        suggestedPercentage: number;
        correctNameDesc: boolean;
        hasWorkflow: boolean;
    }>;
    itemsLength: number;
};

const TEMPLATE_PARTS_ORDER = [
    E.StageTableNames.mobilization,
    E.StageTableNames.structure,
    E.StageTableNames.internalFinishes,
    E.StageTableNames.externalFinishes,
    E.StageTableNames.handover,
    E.StageTableNames.maintenance,
];

export class Stage {
    id = Id.init();

    stageId?: string;

    templateName = '';

    stageLevels = 0;

    updatedOn?: Moment;

    projectScope = 0;

    numberOfInspections = 0;

    projectScopeTwo = 0;

    projectInUse = 0;

    basement = 0;

    additionalFloors = 0;

    outerBlocks = 0;

    groundFloor = true;

    levellingFloor = false;

    penthouseFloor = false;

    pool = false;

    sowId?: Id;

    masterSowId?: number;

    forTemplate = new StageTemplate(this);

    forPlanContract = new StagePlanContract(this);

    forPlanConstruction = new StagePlanConstruction(this);

    // For local use

    isEditing = false;

    defaultParts: StagePart[] = [];

    errorListHolder = new ErrorListHolder(
        () => this.validationData,
        () => struct(this.partsWithItems),
    );

    constructor() {
        makeAutoObservable(this, {
            setName: action,
            setBasement: action,
            setAdditionalFloors: action,
            setOuterBlocks: action,
            removeTemplateRow: action,
            copyTemplateRow: action,
            setupMasterSow: action,
            setDefaultParts: action,
        });
    }

    setDefaultParts = () => {
        for (const name of Object.values(E.StageTableNames)) {
            if (name === E.StageTableNames.none) {
                continue;
            }

            const template = new StagePart();
            template.planStage = name;

            this.defaultParts.push(template);
        }
    };

    get parts() {
        const stageParts = this.forPlanConstruction.projectId
            ? this.forPlanConstruction.planParts
            : this.forTemplate.templateParts;

        if (stageParts.length === 0) {
            if (this.defaultParts.length === 0) {
                this.setDefaultParts();
            }

            return TEMPLATE_PARTS_ORDER.map(item => this.defaultParts
                .find(el => el.planStage === item))
                .filter((x): x is StagePart => Boolean(x));
        }

        return TEMPLATE_PARTS_ORDER.map(item => stageParts
            .find(el => el.planStage === item) ?? this.defaultParts
            .find(el => el.planStage === item))
            .filter((x): x is StagePart => Boolean(x));
    }

    get validationData() {
        const templateParts =[
            'mobilization',
            'structure',
            'internalFinishes',
            'externalFinishes',
            'handover',
            'maintenance',
        ].reduce<Record<string, TemplatePart>>(
            (prev, curr) => {
                prev[curr] = {
                    items: [],
                    itemsLength: 0,
                };
                return prev;
            },
            {},
        );

        let sumOfPercentage = 0;

        this.parts.forEach(item => {
            item.forTemplate.templateUnits.forEach(entry => {
                const suggestedPercentage = entry.suggestedPercentage.value;

                const hasWorkflow = entry.sowItems.length > 0;

                sumOfPercentage = Math.round((Number(sumOfPercentage) + Number(suggestedPercentage)) * 100) / 100;

                if (
                    entry.stageName.length >= 3 &&
                    entry.description.length >= 3
                ) {
                    templateParts[item.planStage].items.push({
                        suggestedPercentage,
                        correctNameDesc: true,
                        hasWorkflow,
                    });
                    return;
                }

                if (
                    entry.stageNameArabic.length >= 3 &&
                    entry.descriptionArabic.length >= 3
                ) {
                    templateParts[item.planStage].items.push({
                        suggestedPercentage,
                        correctNameDesc: true,
                        hasWorkflow,
                    });
                    return;
                }

                templateParts[item.planStage].items.push({
                    suggestedPercentage,
                    correctNameDesc: false,
                    hasWorkflow,
                });
            });
        });

        return {
            templateName: this.templateName,
            mobilization: templateParts.mobilization,
            structure: templateParts.structure,
            internalFinishes: templateParts.internalFinishes,
            externalFinishes: templateParts.externalFinishes,
            handover: templateParts.handover,
            maintenance: templateParts.maintenance,
            parts: sumOfPercentage,
        };
    }

    get partsWithItems() {
        const withItems = {
            none: false,
            mobilization: false,
            structure: false,
            internalFinishes: false,
            externalFinishes: false,
            handover: false,
            maintenance: false,
        };

        this.parts.forEach(item => {
            if (item.forTemplate.templateUnits.length > 0) {
                withItems[item.planStage] = true;
            }
        });

        return withItems;
    }

    get sow() {
        if (!this.sowId) {
            return undefined;
        }

        return stores.sows.sows.get(this.sowId);
    }

    get status() {
        return this.forTemplate.status;
    }

    setupMasterSow = async () => {
        await stores.sows.getMasterSow();

        const masterSow = stores.sows.masterSow;

        if (!masterSow) {
            return;
        }

        Mobx.extendsObservable<Stage>(this, { sowId: masterSow.id });
    };

    setName = (value: string) => {
        if (!this.forTemplate.isEditable) {
            return;
        }

        this.templateName = value;
    };

    toggleIsEditing = () => {
        this.isEditing = !this.isEditing;
    };

    setBasement = (value: number) => {
        if (!this.forTemplate.isEditable) {
            return;
        }

        this.basement = utilsNumber.toRange(value, 0, 99);
    };

    setAdditionalFloors = (value: number) => {
        if (!this.forTemplate.isEditable) {
            return;
        }

        this.additionalFloors = utilsNumber.toRange(value, 0, 99);
    };

    setOuterBlocks = (value: number) => {
        if (!this.forTemplate.isEditable) {
            return;
        }

        this.outerBlocks = utilsNumber.toRange(value, 0, 99);
    };

    setGroundFloor = () => {
        if (!this.forTemplate.isEditable) {
            return;
        }

        this.groundFloor = true;
    };

    setLevellingFloor = () => {
        if (!this.forTemplate.isEditable) {
            return;
        }

        this.levellingFloor = !this.levellingFloor;
    };

    setPenthouseFloor = () => {
        if (!this.forTemplate.isEditable) {
            return;
        }

        this.penthouseFloor = !this.penthouseFloor;
    };

    setPool = () => {
        if (!this.forTemplate.isEditable) {
            return;
        }

        this.pool = !this.pool;
    };

    removeTemplateRow = (entryId: Id, partId?: Id) => {
        if (!this.forTemplate.isEditable) {
            return;
        }

        this.parts.find(item => item?.id.isEqual(partId))
            ?.forTemplate.removeRow(entryId);
    };

    copyTemplateRow = (item: StageUnit, partId?: Id) => {
        if (!this.forTemplate.isEditable) {
            return;
        }

        this.parts.find(el => el?.id.isEqual(partId))
            ?.forTemplate.copyRow(item);
    };
}
