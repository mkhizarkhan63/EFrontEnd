export const getRandomEnum = <V, T extends Record<string, V>>(enumValue: T) => {
    const valueList = Object.values(enumValue);
    return valueList[Math.floor(Math.random() * valueList.length)] as unknown as V;
};
