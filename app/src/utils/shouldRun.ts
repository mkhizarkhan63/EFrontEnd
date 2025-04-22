export const shouldRun = (condition: boolean, fn: () => void) => {
    if (!condition) {
        return;
    }

    fn();
};
