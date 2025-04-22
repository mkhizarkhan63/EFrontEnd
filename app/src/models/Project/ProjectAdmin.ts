import { action } from 'mobx';
import { E, lang, LazyModelList, restQuery } from '~/api';
import { stores } from '~/stores';
import type { DesignOptionType } from '../Design';
import { type Project } from './Project';
import type { Moment } from 'moment';
import type { SubjectInformationType } from '../Company';

// TODO refactor this model
export class ProjectAdmin {
    logList = new LazyModelList(
        'Project Logs',
        () => restQuery.project.getProjectLogs(this.project),
    );

    isClosedClientDetails = false;

    isClosedStagePlan = false;

    isSaving = false;

    design?: DesignOptionType;

    contractorInvitationCount?: number;

    consultantInvitationCount?: number;

    projectDates: {
        draft?: Moment;
        review?: Moment;
        biding?: Moment;
        chooseContractor?: Moment;
        readyToSign?: Moment;
        signed?: Moment;
    } = {};

    client?: SubjectInformationType;

    constructor(readonly project: Project) {
        makeSafeObservable(this, {
            setClosedClientDetails: action,
            setClosedStagePlane: action,
            project: false,
        });
    }

    get sowName() {
        const sow = stores.sows.sows.data
            .find(item => item.id.isEqual(this.project.designSowId));

        if (!sow) {
            return lang.dict.get('none');
        }

        return sow.contractName;
    }

    get sowItems() {
        const sow = stores.sows.sows.data
            .find(item => item.id.isEqual(this.project.designSowId));

        if (!sow) {
            return [];
        }

        return sow.sowItemList.data;
    }

    setClosedClientDetails = () => {
        this.isClosedClientDetails = !this.isClosedClientDetails;
    };

    setClosedStagePlane = () => {
        this.isClosedStagePlan = !this.isClosedStagePlan;
    };

    decraseInvitationCount = (type: E.RoleInCompany) => {
        if (type === E.RoleInCompany.contractor) {
            this.contractorInvitationCount = (this.contractorInvitationCount ?? 0) + 1;
            return;
        }

        this.consultantInvitationCount = (this.consultantInvitationCount ?? 0) + 1;
    };
}
