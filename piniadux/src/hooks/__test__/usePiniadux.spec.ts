// 基础功能
import { renderHook } from '@testing-library/react-hooks';
import { describe, expect, it } from 'vitest';
import { usePiniadux } from '../usePiniadux';

const USER = Symbol('user');
const setUp = () =>
  renderHook(() =>
    usePiniadux(USER, {
      state() {
        return {
          a: 1,
          b: {
            c: 1,
          },
        };
      },
    }),
  );

describe('usePiniadux`s Basic Feature', () => {
  it('should be defined', () => {
    expect(usePiniadux).toBeDefined();
  });

  it('usePiniadux with basic variable should work', async () => {
    const { result, rerender } = setUp();
    rerender();

    expect(result.current.store.a).toEqual(1);
    result.current.store.a = 10;
    expect(result.current.store.a).toEqual(10);
    rerender();
    expect(result.current.store.a).toEqual(10);
  });

  it('usePiniadux with reference variable should work', async () => {
    const { result, rerender } = setUp();
    expect(result.current.store.b.c).toEqual(1);
    result.current.store.b.c = 10;
    expect(result.current.store.b.c).toEqual(10);
    const { result: result2 } = setUp();
    rerender();
    expect(result.current.store.b.c).toEqual(10);
    expect(result2.current.store.b.c).toEqual(10);
  });
});
