export const toKebabCase = (value: string) => value
    .replace(/([A-Z])/g, x => ['-', x.toLowerCase()].join(''));

