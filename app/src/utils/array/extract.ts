type Extract = {
    <T>(arr: T[], index: number): T | undefined;
    <T, A>(arr: T[], index: number, alt: A): T | A;
};

export const extract: Extract = <T>(arr: T[], index: number, alt?: T) => (arr.length > index ? arr[index] : alt);
