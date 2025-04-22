export const generateObject = <A, K extends PropertyKey>(a: () => A, ...keys: K[]) => Object.fromEntries(
    keys.map(k => [k, a()]),
) as { [P in K]: A };
