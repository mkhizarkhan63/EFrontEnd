import { useEffect, useState } from 'react';

type Vm = {
    mount?: () => void;
    unmount?: () => void;
    [AnyKey: PropertyKey]: ReturnType<ObjectConstructor['values']>[number];
};

export const useVm = <T extends Vm>(
    creator: () => T,
    deps: unknown[] = [],
) => {
    const [vm, setVm] = useState(creator);
    const [isInitial, setInitial] = useState(true);

    useEffect(() => {
        let newVm = vm;

        if (isInitial) {
            setInitial(false);
        } else {
            newVm = creator();
            setVm(newVm);
        }

        newVm.mount?.();

        return () => {
            newVm.unmount?.();
        };
    }, deps);

    return vm;
};
