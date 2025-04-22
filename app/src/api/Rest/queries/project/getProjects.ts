import { dtos, models, type Paging } from '~/api';

export const getProjects = async (paging?: Paging) => {
    const data = await dtos.construction.execListConstructionProjectQuery(
        {
            ...paging ? paging.toQuery() : {},
        },
    );

    if (!data || !data.result || data.result.length === 0) {
        return [];
    }

    paging?.setPagesCount(data.pageCount ?? 1);

    return data.result.map(x => models.project.toInternalProject(x));
};
