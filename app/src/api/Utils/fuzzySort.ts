import { compareTwoStrings } from 'string-similarity';

export const fuzzySort = <Value>(
    mainValue: string,
    values: Value[],
    getter: (value: Value) => string,
    minSimilarity = .5,
) => values
    .map(item => ({
        similarity: compareTwoStrings(
            mainValue,
            getter(item),
        ),
        item,
    }))
    .filter(item => !mainValue || item.similarity >= minSimilarity)
    .sort((a, b) => a.similarity - b.similarity)
    .map(item => item.item);
