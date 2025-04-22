import { useEffect } from 'react';

export const useAutoFocus = () => useEffect(() => {
    const button= document.querySelector<HTMLButtonElement>('button[type="submit"]');
    button?.focus();
}, []);
