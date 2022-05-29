import { renderHook } from '@testing-library/react-hooks';
import { describe, it } from 'vitest';
import useLatest from '../useLatest';

const setUp = () => renderHook(useLatest);
describe('useLatest', () => {
  it('test', () => {
    const { result, rerender } = setUp();
    expect(result.current).toBeDefined();
    expect(result.current.current).toBe(undefined);
    rerender(2);
    expect(result.current.current).toBe(2);
  });
});
