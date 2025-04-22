import { Img, type dtos } from '~/api';
import { SubjectInformation } from '~/models';
import { stores } from '~/stores';

export const toInternalSubjectInformation = (
    x: dtos.construction.SubjectInformationDto,
) => SubjectInformation.create({
    id: stores.idCollection.getInternal('subject', x.subjectId),
    name: x.name,
    email: x.email,
    phone: x.phone,
    avatar: Img.tryCreate(x.avatar),
});
