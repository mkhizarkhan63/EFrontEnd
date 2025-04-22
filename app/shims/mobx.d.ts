import { makeAutoObservable } from 'mobx';

declare global {
    const makeSafeObservable: typeof makeAutoObservable;
}

export {};
