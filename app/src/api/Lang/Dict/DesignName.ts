import { utilsObject } from '~/utils';

export const designName = utilsObject.prefixKeys('designName/', {
    lightMinimalist: 'Light Minimalist',
    dar: 'Dar',
    finaa: "Fina'a",
    theLift: 'The Lift',
    theBackyard: 'The Backyard',
} as const);
