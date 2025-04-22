import { makeAutoObservable, makeObservable } from 'mobx';

export const makeSafeObservable: typeof makeObservable = (obj, list, args) => {
	if (!list) {
		list = {} as Required<Parameters<typeof makeObservable>>[1];
	}

	for (const [key, value] of Object.entries(obj)) {
		if (!(key in list)) {
			if (typeof value === 'function') {
				(list as unknown as Record<string, unknown>)[key] = false;
			}
		}
	}

	return makeAutoObservable(obj, list, {
		autoBind: true,
		deep: true,
		...args,
	});
};
