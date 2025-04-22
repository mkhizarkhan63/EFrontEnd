export const fromInputCr = (cr: string, oldCr: string) => (cr.length > 12 || isNaN(Number(cr)) ? oldCr : cr);
