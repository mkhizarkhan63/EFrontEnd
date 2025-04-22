import { action } from 'mobx';
import { E, Id } from '~/api';
import { Project, ProjectBid, Stage, type SowItem, type WorkflowType } from '~/models';
import { stores } from '~/stores';
import type { ConsultantType, ContractorType } from './Company';
import { ContractSubject, type ContractSubjectType } from './ContractSubject';
import type { Signature } from './Signature';
import moment from 'moment';

export class Contract {
    id = Id.init();

    templateId?: Id;

    filePath = '';

    status = E.ContractStatus.none;

    subject = E.ContractSubjects.none;

    project = new Project();

    bid = new ProjectBid(this.project);

    stage = new Stage();

    clientSignature?: Signature;

    contractorSignature?: Signature;

    consultantSignature?: Signature;

    clientSubject?: ContractSubjectType;

    contractor?: ContractorType;

    consultant?: ConsultantType;

    constructionPrice = 0;

    workflows?: WorkflowType[] = [];

    consultantVisits?: Array<{
        itemId: Id;
        visit: number;
    }>;

    workflowIds: number[] = [];

    contractorMaterials: SowItem[] = [];

    clientMaterials: SowItem[] = [];

    materialSpecifications: SowItem[] = [];

    projectStartDate = moment();

    constructor() {
        makeSafeObservable(this, {
            setSubject: action,
        });
    }

    get isClient() {
        return this.subject === E.ContractSubjects.client;
    }

    get contractorSubject() {
        return this.contractor?.contractSubject;
    }

    get consultantSubject() {
        return this.consultant?.contractSubject;
    }

    get allSubjects() {
        return Boolean(this.clientSubject?.isExternal)
            && Boolean(this.contractorSubject?.isExternal)
            && Boolean(this.consultantSubject?.isExternal);
    }

    get allSigned() {
        return Boolean(this.clientSignature)
            && Boolean(this.contractorSignature)
            && Boolean(this.consultantSignature);
    }

    get company() {
        if (this.subject === E.ContractSubjects.client) {
            return undefined;
        }

        return this.subject === E.ContractSubjects.contractor
            ? this.contractor
            : this.consultant;
    }

    getSubject = (subject = this.subject) => {
        switch (subject) {
            case E.ContractSubjects.client:
                return this.clientSubject;
            case E.ContractSubjects.contractor:
                return this.contractorSubject;
            case E.ContractSubjects.consultant:
                return this.consultantSubject;
        }

        return undefined;
    };

    isSigned = (subject = this.subject) => {
        switch (subject) {
            case E.ContractSubjects.none:
                return false;
            case E.ContractSubjects.client:
                return Boolean(this.clientSignature);
            case E.ContractSubjects.contractor:
                return Boolean(this.contractorSignature);
            case E.ContractSubjects.consultant:
                return Boolean(this.consultantSignature);
        }
    };

    createSubject = () => {
        const subject = ContractSubject.create({ type: this.subject });
        switch (this.subject) {
            case E.ContractSubjects.client:
                const profile = stores.profile.currentProfile;
                subject.setOwnerName(profile.name ?? '');
                subject.setPhone(profile.phone ?? '');
                subject.setEmail(profile.email ?? '');
                subject.setImg(profile.avatar?.img?.clone());
                this.clientSubject = subject;
                break;
            case E.ContractSubjects.contractor:
                if (!this.contractor) {
                    break;
                }
                this.contractor.addContractSubject(subject);
                break;
            case E.ContractSubjects.consultant:
                if (!this.consultant) {
                    break;
                }
                this.consultant.addContractSubject(subject);
                break;
        }
    };

    setSubject = (subject: E.ContractSubjects) => {
        this.subject = subject;
    };
}
