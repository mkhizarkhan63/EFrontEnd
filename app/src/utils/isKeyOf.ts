export const isKeyOf = <T extends object>(p: PropertyKey, target: T): p is keyof T => p in target;
