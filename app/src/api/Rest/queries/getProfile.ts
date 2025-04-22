import { enums, Id, Img, Mobx, T } from '~/api';
import { FileData, Profile, ProfileInCompany } from '~/models';
import { dtos } from '..';

export const getProfile = async () => {
    const data = await dtos
        .profile
        .execGetProfileQuery(undefined);

    if (!data || !data.result) {
        return;
    }

    const { result: external } = data;

    const profile = new Profile();

    const avatar = FileData.create({
        fileId: external.profilePicture,
    });

    if (external.profilePicture) {
        avatar.loadImgFromId(external.profilePicture);
        avatar.connect();
    }

    const contexts = external.contextsAffiliation
        ?.map(item => item.context)
        .filter((item): item is dtos.profile.ContextDto => typeof item !== 'undefined') ?? [];

    const profileModes = external.profileModes?.map(item => Object.create({
        id: item.id,
        mode: T.create(item.mode, enums.SpecialProfileMode.castToInternal),
        projectId: item.projectId,
    }));

    return Mobx.extendsObservable(profile, {
        id: Id.init(external.id, 'external'),
        avatar,
        name: external.name,
        email: external.email,
        phone: external.phone,
        mainRole: T.create(
            external.defaultType,
            enums.RoleInCompany.castToInternal,
        ),
        defaultCompany: toInternalCompany(external.defaultContextId, external.defaultType, contexts),
        selectedCompany: toInternalCompany(external.defaultContextId, external.defaultType, contexts),
        profilesInCompanies: external.contextsAffiliation?.map(
            ({ context, affiliationType }) => toInternalCompany(context?.id, context?.type, contexts, affiliationType),
        ) ?? [],
        profileModes,
        redirectToInvitations: Boolean(external.profileModes?.length),
    });
};

const toInternalCompany = (
    contextId?: number,
    defaultType?: dtos.profile.ContextType,
    contexts?: dtos.profile.ContextDto[],
    affiliationType?: dtos.profile.AffiliationType,
) => {
    const profileInCompany = new ProfileInCompany();

    if (!contextId || !defaultType || !contexts) {
        return profileInCompany;
    }

    const external = contexts.find(item => item.id === contextId && item.type === defaultType);

    if (external) {
        if (external.contextIcon) {
            Mobx.extendsObservable(profileInCompany, {
                logo: Img.create(external.contextIcon),
            });
        }

        return Mobx.extendsObservable(profileInCompany, {
            companyName: external.name,
            id: Id.init(external.id, 'external'),
            contextId: Id.init(external.companyId, 'external'),
            affiliationType: T.tryCreate(
                affiliationType,
                enums.AffiliationType.castToInternal,
            ),
            role: T.create(
                external.type,
                enums.RoleInCompany.castToInternal,
            ),
        });
    }

    return profileInCompany;
};
