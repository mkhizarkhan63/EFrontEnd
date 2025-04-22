export const confirmPrompt = (message: string, fn: () => void) => {
    if (window.confirm(message)) {
        fn();
    }
};
