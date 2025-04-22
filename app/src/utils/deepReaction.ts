import { reaction } from 'mobx';
import JsonStringify from 'json-stringify-safe';
import { debounce } from './debounce';

type TheUnknown = Parameters<Window['alert']>[0];

const walk = (
    current: TheUnknown,
    keys: string[] = [],
) => {
    if (typeof current !== 'object' || current === null) {
        return current;
    }

    if (keys.length === 0) {
        return JsonStringify(current);
    }

    return JsonStringify(
        Object.fromEntries(
            Object.entries(current).filter(entry => keys.includes(entry[0])),
        ),
    );
};

export const deepReaction = <T>(
    getTarget: () => T,
    reactionFn: (data: T) => void,
    keys?: Array<keyof T & string>,
    timeout = 300,
) => reaction(
    () => walk(getTarget(), keys),
    debounce(() => reactionFn(getTarget()), timeout),
);
