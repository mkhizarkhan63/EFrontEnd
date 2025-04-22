import { makeAutoObservable } from 'mobx';

class HelpViewModel {
    openedIndices: number[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    toggleAtIndex = (index: number) => () => {
        if (this.openedIndices.includes(index)) {
            this.openedIndices = this.openedIndices.filter(x => x !== index);
        } else {
            this.openedIndices.push(index);
        }
    };
}

export const helpViewModel = new HelpViewModel();
