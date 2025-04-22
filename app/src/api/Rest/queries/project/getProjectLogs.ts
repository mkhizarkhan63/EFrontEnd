import moment from 'moment';
import { dtos, restQuery } from '~/api';
import { stores } from '~/stores';
import { Log, type Project } from '~/models';

export const getProjectLogs = async (project: Project) => {
    const data = await dtos.log.execListProjectLogByProjectIdQuery({
        projectId: project.id.asNumber(),
    });

    if (!data || !data.result) {
        return [];
    }

    return Promise.all(data.result.map(toInternalLog));
};

const toInternalLog = async (external: dtos.log.ProjectLogDto) => {
    const user = await restQuery.getUserInfo(external.userId);

    return Log.create({
        id: stores.idCollection.getInternal('log'),
        description: external.message,
        date: moment.utc(external.logDate).local(),
        user: user?.name,
    });
};
