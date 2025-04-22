import type { Moment } from 'moment';
import type { E, Id, Img } from '~/api';
import type { Project } from './Project';

export class ProjectConsultant {
    invitationId?: Id;

    invitationConsultantId?: Id;

    invitationStatus?: E.InvitationStatus;

    invitationType?: E.InvitationType;

    invitationDate?: Moment;

    clientName?: string;

    clientEmail?: string;

    clientContact?: string;

    clientAvatar?: Img;

    constructor(readonly project: Project) {
        makeSafeObservable(this, {});
    }
}
