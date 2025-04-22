export const prefixKeys = <P extends string, R extends Record<string, unknown>>(prefix: P, obj: R) => {
    const entries = Object.entries(obj).map(([k, v]) => [`${prefix}${k}`, v]);
    return Object.fromEntries(entries) as {
        [K in keyof R as K extends string ? `${P}${K}` : never]: R[K];
    };
};
