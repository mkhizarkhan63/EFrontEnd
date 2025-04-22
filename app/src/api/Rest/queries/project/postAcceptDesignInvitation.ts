import type { Id } from '~/api';

export const postAcceptDesignInvitation = async (constructionProjectId: Id) => {
    if (constructionProjectId.isType('internal')) {
        return false;
    }

    return Promise.resolve();
};
