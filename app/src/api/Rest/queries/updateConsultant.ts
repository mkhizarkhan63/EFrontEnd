import { utilsString } from '~/utils';
import * as dtos from '../dtos/contractor';

export const updateConsultant = async (
    consultantId?: number,
    params?: Partial<dtos.ConsultantDto>,
    nestedParams?: Array<{
        property: keyof dtos.ConsultantDto;
        value: Array<Record<string, unknown>>;
    }>,
) => {
    if (!consultantId) {
        return false;
    }

    const operations: dtos.JsonPatchElement[] = [];

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value === undefined) {
                return;
            }

            operations.push({
                operation: dtos.OperationType.replace,
                path: patchPathFromKey(key),
                value: value as unknown as Record<string, unknown>,
            });
        });
    }

    operations.push(...(nestedParams ?? []).map(x => ({
        operation: dtos.OperationType.replace,
        path: patchPathFromKey(x.property),
        value: x.value.map(capitalizeRecord) as unknown as Record<string, unknown>,
    })));

    if (operations.length === 0) {
        return false;
    }

    const data = await dtos.execPatchConsultantCommand({
        id: consultantId,
        operations,
    });

    if (!data || !data.isSuccess) {
        return false;
    }

    return data.isSuccess;
};

const patchPathFromKey = (key: string) => `/${utilsString.capitalize(key)}`;

const capitalizeRecord = (record: Record<string, unknown>) => {
    const result: Record<string, unknown> = {};
    Object.keys(record).forEach(key => {
        result[utilsString.capitalize(key)] = record[key];
    });
    return result;
};
