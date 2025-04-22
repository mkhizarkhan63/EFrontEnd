import { describe, it, expect } from '~cypress';
import { Env } from '~/api';

const TEST_KEY = 'SENTRY_DSN' as const;

describe('api/Env', () => {
    it('should follow window values', () => {
        (window as any)[Env.key] = {
            [TEST_KEY]: 'test-window',
        };
        expect(Env.get(TEST_KEY)).eq('test-window');
    });

    it('should can be edited', () => {
        Env.set(TEST_KEY, 'test-edit');
        expect(Env.get(TEST_KEY)).eq('test-edit');
    });

    it('should return alternative version for missing value', () => {
        Env.set(TEST_KEY);
        expect(Env.get(TEST_KEY, 'test-alt')).eq('test-alt');
    });

    it('should return undefined for missing value', () => {
        Env.set(TEST_KEY);
        expect(Env.get(TEST_KEY)).eq(undefined);
    });
});
