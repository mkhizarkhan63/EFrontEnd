import { Img } from '~/api';

export const loadImageFromFile = (imgFile: File | Blob) => new Img(URL.createObjectURL(imgFile));
