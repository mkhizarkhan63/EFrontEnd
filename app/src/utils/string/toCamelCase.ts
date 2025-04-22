export const toCamelCase = (value: string) => value
    .replace(/^./, x => x.toLowerCase())
    .replace(/[\s_-]+([a-z])/g, (x0, x1) => x1.toUpperCase())
    .replace(/\s+/g, '');
