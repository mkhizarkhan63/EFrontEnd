export const toTwoDigitNumber = (number: number) => {
    if (number <= 0 || isNaN(number)) {
        return '00';
    }

    return String(number).padStart(2, '0');
};
