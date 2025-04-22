export const toRates = (value: string) => {
    const regex = /(\d*[,.|]{0,1}\d{0,3})/s;
    return value.match(regex)?.[0].replace(',', '.') ?? '';
};
