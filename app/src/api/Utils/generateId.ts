import { v4 } from 'uuid';

export const generateId = <
    T extends Record<string, unknown>,
    Key extends keyof T,
>(
    list: T[],
    key: Key extends string ? Key : never,
    generator = () => v4(),
) => {
    const keys = list.map(item => item[key] as string);
    let id: string;

    do {
        id = generator();
    } while (keys.includes(id));

    return id;
};
