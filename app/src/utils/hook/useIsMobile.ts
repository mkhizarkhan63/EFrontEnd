import { useMediaMatch } from 'rooks';

export const useIsMobile = () => useMediaMatch('(max-width: 768px)');
