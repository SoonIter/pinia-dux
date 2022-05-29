import Observer from '../Observer';
import { describe, it } from 'vitest';
import { act } from '@testing-library/react-hooks';

describe('Observer', () => {
  it('number boolean string', async () => {
    let a = 1;
    let b = true;
    let c = 'hello';
    const observer = new Observer({ a, b, c });
    observer.addEffect(() => {
      a = observer.primaryObj.a;
      b = observer.primaryObj.b;
      c = observer.primaryObj.c;
    });
    expect(a).toBe(1);
    observer.proxyObj.a = 10;
    observer.proxyObj.b = false;
    observer.proxyObj.c = 'world';

    expect(a).toBe(10);
    expect(b).toBe(false);
    expect(c).toBe('world');
  });

  it('Object', () => {
    const observer = new Observer({ a: 1, b: { c: 10, d: 11 } });
    let c = 1;
    observer.addEffect(() => {
      c = observer.primaryObj.b.c;
    });
    expect(c).toBe(1);
    observer.proxyObj.b.c = 10;
    observer.runEffectQueue();
    expect(c).toBe(10);
  });
});
