import { describe, it, expect } from '~cypress';
import { debug } from '~/api';

describe('api/Debug', () => {
    it('should do alternative path when disabled', () => {
        let hasBeenUsed = false;

        debug.isEnabled = false;

        debug.orDo(() => {
            hasBeenUsed = true;
        });

        expect(hasBeenUsed, 'hasBeenUsed').eq(true);
    });
});
