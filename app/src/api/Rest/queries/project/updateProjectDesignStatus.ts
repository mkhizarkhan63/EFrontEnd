import { T, type E } from '~/api';
import { dtos, enums } from '../..';

export const updateProjectDesignStatus = async (projectId: number, trigger: E.DesignProjectTrigger) => {
    const data = await dtos.construction.execUpdateDesignProjectStatusCommand({
        projectId,
        action: T.create(
            trigger,
            enums.DesignTrigger.castToExternal,
        ),
    });

    if (!data) {
        return false;
    }

    return data.isSuccess;
};
