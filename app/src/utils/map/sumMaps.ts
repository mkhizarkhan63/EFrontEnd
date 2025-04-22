export const sumMaps = <T>(arr: Array<Map<T, number>>) => {
    const map = new Map<T, number>();

    const keys = new Set(arr.flatMap(x => Array.from(x.keys())));

    keys.forEach(item => {
        arr.forEach(el => {
            map.set(item, (map.get(item) ?? 0) + (el.get(item) ?? 0));
        });
    });

    return map;
};

