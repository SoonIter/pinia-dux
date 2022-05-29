import { it, expect, describe } from 'vitest';
import produce from '../produce';
describe('produce', () => {
  it('base feature', () => {
    const obj = {
      a: 1,
      b: { c: 10, e: { f: 3 } },
      d: 2,
    };
    const newObj = produce(obj, (draft) => {
      draft.a++;
      draft.a++;
      draft.b.c++;
      draft.d++;
      draft.b.e.f++;
      draft.d++;
    });
    expect(newObj).toBeDefined();
    expect(obj).not.toBe(newObj);
    expect(obj).toEqual({ a: 1, b: { c: 10, e: { f: 3 } }, d: 2 }); //原对象不变
    expect(newObj).toEqual({ a: 3, b: { c: 11, e: { f: 4 } }, d: 4 }); //生成一个新对象
  });
  it('immer', () => {
    const obj = {
      a: 1,
      b: { c: 3, e: { f: 4 } },
      d: 2,
    };
    let newObj = produce(obj, (draft) => {});
    expect(obj.b).toBe(newObj.b);

    newObj = produce(obj, (draft) => {
      draft.a++;
    });
    expect(obj).not.toBe(newObj);
    expect(obj.b).toBe(newObj.b);
  });
});
