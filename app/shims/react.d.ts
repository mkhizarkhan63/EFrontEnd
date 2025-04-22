declare module 'react' {
    interface HTMLAttributes<T> {
        css?: string;
    }
}

import { createElement, Fragment } from 'react';

declare global {
    const h = createElement;
    const Hfrag = Fragment;
}
