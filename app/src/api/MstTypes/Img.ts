import { untracked } from 'mobx';
import { types } from 'mobx-state-tree';
import { Img as ImgClass } from '~/api';

export const Img = types.custom<string, ImgClass | undefined>({
    name: 'Img',
    fromSnapshot: url => new ImgClass(url),
    toSnapshot: img => untracked(() => img?.url ?? ''),
    isTargetType: value => typeof value !== 'string',
    getValidationMessage: value => (typeof value === 'string' ? '' : `${value} doesn't look like a valid Img`),
});
