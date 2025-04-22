type ModelToRaw<T> = T extends {
    [K in keyof T as K extends string ? K : never]: T[K];
}
    ? {
        [K in keyof T as K extends string ? K : never]: NonNullable<
        ModelToRaw<T[K]>
        >;
    }
    : NonNullable<T>;

export const setReference = <
    Model,
    RawModel extends NonNullable<ModelToRaw<Model>>,
    RefKey extends keyof {
        [Key in keyof RawModel as RawModel[Key] extends {
            id: number;
        }
            ? Key
            : never]: string;
    },
>(
    model: Model,
    refKey: RefKey,
    refId: number,
) => {
    model[refKey as keyof Model] = refId as Model[keyof Model];
};
