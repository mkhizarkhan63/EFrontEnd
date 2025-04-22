import * as T from 'superstruct';

export const createMapper = <Internal, External>(
    name: string,
    dataMap: Array<[external: External, internal: Internal]>,
) => {
    const internal = T.define<Internal>(
        `mapper:${name}/internal`,
        value => dataMap.some(x => x[1] === value),
    );

    const external = T.define<External>(
        `mapper:${name}/external`,
        value => dataMap.some(x => x[0] === value),
    );

    const castToInternal = T.coerce(
        internal,
        external,
        value => dataMap.find(x => x[0] === value)?.[1],
    );

    const castToExternal = T.coerce(
        external,
        internal,
        value => dataMap.find(x => x[1] === value)?.[0],
    );

    return Object.freeze({
        internal,
        external,
        castToExternal,
        castToInternal,
    });
};
