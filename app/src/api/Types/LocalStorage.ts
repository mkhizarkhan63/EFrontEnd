import { T } from '..';

export const LocalStorage = () => T.type({
    language: T.optional(T.string()),
    // TEMPORARY
    emailNotifications: T.optional(T.string()),
    websiteNotifications: T.optional(T.string()),
});

export const SessionStorage = () => T.type({
    id: T.optional(T.string()),
    authRedirect: T.optional(T.string()),
});
