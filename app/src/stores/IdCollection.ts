import { types } from 'mobx-state-tree';
import { BidirectionalMap } from '~/api';
import { generateObject } from '~/utils';

const MODEL_NAMES = [
    'contractorCompany',
    'clientReference',
    'marketingInformation',
    'linkedProfile',
    'organization',
    'specialization',
    'resource',
    'file',
    'project',
    'context',
    'designOption',
    'user',
    'company',
    'supplier',
    'service',
    'product',
    'invoice',
    'subscription',
    'review',
    'companyAssociation',
    'governorate',
    'wilayat',
    'employee',
    'log',
    'reviewStars',
    'clientReferenceId',
    'subject',
    'workflow',
    'workflowType',
    'question',
    'questionAnswer',
    'workflowTask',
    'taskChecklist',
    'checklistSubItem',
    'checkOption',
    'phase',
    'stage',
    'workflowSequence',
    'userTask',
    'actor',
    'taskUpdate',
    'comment',
    'submission',
    'sowItemDto',
    'sowItemUnit',
    'material',
    'materialOption',
    'payment',
    'materialPayment',
    'materialQuantity',
    'pmTaskUpdate',
    'pmLog',
    'taskUpdateId',
    'architectListItem',
    'constructionProjectAdmin',
    'contractorForInvite',
    'invitedCompany',
    'invite',
    'companyInvite',
] as const;

type InternalId = number;
type ExternalId = number;
type ModelName = typeof MODEL_NAMES[number];

export class IdCollection {
    private idsMaps = generateObject(
        () => new BidirectionalMap<InternalId, ExternalId>(),
        ...MODEL_NAMES,
    );

    private lastIds = generateObject(
        () => 1,
        ...MODEL_NAMES,
    );

    private genInternal = (type: ModelName) => this.lastIds[type]++;

    getInternal = (type: ModelName, id?: ExternalId) => {
        if (id) {
            const internalId = this.idsMaps[type].getA(id);

            if (internalId) {
                return internalId;
            }

            const newInternalId = this.genInternal(type);
            this.connect(type, newInternalId, id);

            return newInternalId;
        }

        return this.genInternal(type);
    };

    getExternal = (type: ModelName, id: InternalId) => this.idsMaps[type].getB(id);

    isExternal = (type: ModelName, id: InternalId) => typeof this.idsMaps[type].getB(id) !== 'undefined';

    connect = (type: ModelName, internalId: InternalId, externalId: ExternalId) => {
        this.idsMaps[type].set(internalId, externalId);
    };

    disconnect = (type: ModelName, id: InternalId) => {
        this.idsMaps[type].removeA(id);
    };

    clear = (type: ModelName) => {
        this.lastIds[type] = 1;
        this.idsMaps[type] = new BidirectionalMap();
    };

    getIdentifier = (type: ModelName) => types.optional(types.identifierNumber, () => this.getInternal(type));

    getId = (type: ModelName) => types.optional(types.number, () => this.getInternal(type));
}
