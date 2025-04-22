import { Env, T } from '~/api';
import { utilsObject } from '~/utils';
import { restClient } from '..';

const tSpecialOptional = <T, S>(struct: T.Struct<T, S>): T.Struct<T | undefined, S> => new T.Struct({
    ...struct,
    validator: (value, ctx) => value === undefined || value === null || struct.validator(value, ctx),
    refiner: (value, ctx) => value === undefined || value === null || struct.refiner(value, ctx),
});

type CustomError = {
    passwordMismatch: string;
};

type Response = {
    status: string;
    success: boolean;
    errors: CustomError;
};

export const ResponseStruct = () => (
    T.type({
        status: tSpecialOptional(T.string()),
        success: tSpecialOptional(T.boolean()),
        errors: T.type({
            passwordMismatch: tSpecialOptional(T.string()),
        }),
    }) as unknown as T.Describe<Response>
);

export const updateClientPassword = async (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
) => {
    const data = await restClient.sendRaw(
        'POST',
        '/connect/change_password',
        {},
        JSON.stringify({
            oldPassword,
            newPassword,
            confirmPassword,
        }),
        Env.get('AUTH_ENDPOINT'),
        utilsObject.toKebabCaseKeys({ contentType: 'application/json' }),
    ).asJson();

    return ResponseStruct().create(data);
};
