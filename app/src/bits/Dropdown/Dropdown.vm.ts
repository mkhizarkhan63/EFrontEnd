import { makeAutoObservable } from 'mobx';

export class DropdownViewModel {
    isOpen = false;

    open = () => {
        this.isOpen = true;
    };

    close = () => {
        this.isOpen = false;
    };

    toggle = () => {
        this.isOpen = !this.isOpen;
    };

    constructor() {
        makeAutoObservable(this);
    }
}
