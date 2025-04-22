import { makeAutoObservable, runInAction } from 'mobx';
import { utilsArray } from '~/utils';
import { E, Env } from '..';

type ObjectOfImage = {
    url: string;
};

export const TRANSPARENT_PIXEL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

const getPath = (id?: string, size = E.MinifiedImageSize.small) => `${Env.get('API_ENDPOINT')}file/getfilerequest/${id}?imageSize=${size}`;

export class Img {
    url;

    isLoaded = false;

    isPreloaded = false;

    disposers: Array<() => void> = [];

    constructor(objectOfImage: ObjectOfImage);

    constructor(url: string);

    constructor(img: ObjectOfImage | string) {
        this.url = typeof img === 'string' ? img : img.url;

        makeAutoObservable(this, {
            load: false,
        });
    }

    get css() {
        return `url(${this.url})`;
    }

    load = () => {
        this.disposers = this.disposers.filter(x => {
            x();
            return false;
        });

        if (this.isLoaded || this.isPreloaded) {
            return;
        }

        this.isPreloaded = true;

        const img = new Image();
        img.addEventListener('load', () => {
            runInAction(() => {
                this.isLoaded = true;
            });
        });
        img.src = this.url;
    };

    clone = () => new Img(this.url);

    static empty() {
        return new Img(TRANSPARENT_PIXEL);
    }

    static create(id?: string, sizeGen?: (e: typeof E.MinifiedImageSize) => E.MinifiedImageSize) {
        return new Img(id ? getPath(id, sizeGen?.(E.MinifiedImageSize)) : TRANSPARENT_PIXEL);
    }

    static tryCreate(id?: string, sizeGen?: (e: typeof E.MinifiedImageSize) => E.MinifiedImageSize) {
        return id ? new Img(getPath(id, sizeGen?.(E.MinifiedImageSize))) : undefined;
    }

    static extractFileId(url?: string) {
        if (!url) {
            return;
        }

        const splitted = url.split('/');

        return utilsArray.extract(splitted, splitted.length - 1);
    }
}
