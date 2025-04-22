export const toSnakeCase = (value: string) => value
    .replace(/([A-Z])/g, x => ['_', x.toLowerCase()].join(''));
