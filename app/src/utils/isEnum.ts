export const isEnum = <Enum extends Record<string, string>>(e: Enum) => (key: unknown): key is Enum[keyof Enum] => Object.values(e).includes(key as Enum[keyof Enum]);
