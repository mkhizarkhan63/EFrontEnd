export const fromInputPhone = (newValue: string, oldValue: string) => {
    const regex = /^(\+\d{0,15}|\d{0,9})$/;

    return regex.test(newValue) ? newValue : oldValue;
};
