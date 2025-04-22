import { action, runInAction } from 'mobx';
import { deepReaction } from '~/utils';

type TheUnknown = Parameters<Window['alert']>[0];
type AnyInstanceType = Record<TheUnknown, TheUnknown>;

export class ChangesKeeper<T extends AnyInstanceType> {
    hasBeenChanged = false;

    shouldBlock = false;

    disposer?: () => void;

    constructor(
        private observedObject: T,
        private keys: Array<keyof T & string> = ['empty'],
    ) {
        makeSafeObservable(this, {
            markAsUnchanged: action,
            markAsChanged: action,
            silentChange: action,
            startListening: action,
            dispose: action,
            setKeys: action,
            setShouldBlock: action,
        });

        this.startListening();
    }

    setKeys = (keys: Array<keyof T & string>) => {
        this.keys = keys;
        this.startListening();
    };

    dispose = () => {
        this.disposer?.();
        this.disposer = undefined;
    };

    markAsChanged = () => {
        if (this.hasBeenChanged) {
            return;
        }

        this.hasBeenChanged = true;
    };

    silentChange = (func: () => void) => {
        this.dispose();
        func();
        this.startListening();
    };

    startListening = () => {
        this.dispose();
        this.disposer = deepReaction(
            () => this.observedObject,
            () => {
                runInAction(() => {
                    this.markAsChanged();
                    this.setShouldBlock(true);
                });
            },
            this.keys,
        );
    };

    markAsUnchanged = () => {
        if (!this.hasBeenChanged) {
            return;
        }

        this.hasBeenChanged = false;
    };

    setShouldBlock = (block: boolean) => {
        if (this.shouldBlock === block) {
            return;
        }

        this.shouldBlock = block;
    };
}
