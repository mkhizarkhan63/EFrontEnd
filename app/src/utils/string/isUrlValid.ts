export const isUrlValid = (url: string) => {
    if (url === '') {
        return false;
    }

    return /^(https?:\/\/)?([\w-]+\.)+([\w-/]+)([#?].*)?$/i.test(url);
};
