import { act, renderHook } from '@testing-library/react-hooks';
import { useRef } from 'react';
import { describe, it } from 'vitest';
import useForceUpdate from '../useForceUpdate';
const testHook = () => {
  const counter = useRef(1);
  const forceUpdate = useForceUpdate();
  counter.current++;
  return { counter, forceUpdate };
};
const effect = () => renderHook(testHook);

describe('useForceUpdate', () => {
  it('forceUpdate == rerender', async () => {
    const { result, rerender } = effect();
    expect(result.current.counter.current).toBe(2);
    act(() => {
      result.current.forceUpdate();
    });
    expect(result.current.counter.current).toBe(3);
    act(() => {
      rerender();
    });
    expect(result.current.counter.current).toBe(4);
  });
  it('forceUpdate should not be changed', () => {
    const { result, rerender } = effect();
    let last = result.current.forceUpdate;
    rerender();
    expect(last).toBe(result.current.forceUpdate);
  });
});
