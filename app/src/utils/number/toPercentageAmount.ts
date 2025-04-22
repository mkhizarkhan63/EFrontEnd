
export const toPercentageAmount = (amount: number, percent: number) => {
    const percentageAmount = amount * (percent / 100);
    const result = amount - percentageAmount;

    return {
        percentageAmount: Math.round(percentageAmount * 100) / 100,
        result: Math.round(result * 100) / 100,
    };
};
