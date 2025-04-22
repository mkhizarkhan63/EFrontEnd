export const toExternalUrl = (value: string) => {
    if (!value.startsWith('https://')) {
        return `https://${value}`;
    }

    return value;
};
