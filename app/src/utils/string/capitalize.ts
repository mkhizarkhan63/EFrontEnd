export const capitalize = (text?: string, split = false) => {
    if (!text) {
        return '-';
    }

    const result = text.charAt(0).toUpperCase() + text.slice(1);

    if (split) {
        return result.replace(/([A-Z])/g, ' $1');
    }

    return result;
};
