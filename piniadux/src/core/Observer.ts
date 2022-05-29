type EffectFunc<T> = (draft?: T) => void;
//两者不相等 为false 相等为true
function diff(obj1, obj2) {
  if (Object.is(obj1, obj2)) {
    return true;
  }
  for (let key in obj1) {
    if (Object.is(obj1[key], obj2[key])) {
      continue;
    }
    if (typeof obj1[key] === 'object') {
      if (diff(obj1[key], obj2[key]) === false) {
        return false;
      } else {
        continue;
      }
    }
    return false;
  }
  return true;
}
class Observer<T extends Object> {
  public primaryObj: T;
  public proxyObj: T;
  private effectQueue = new Set<EffectFunc<T>>();
  private primaryToProxyMap = new WeakMap<Object, Object>();
  private currEffect: EffectFunc<T> | null = null;
  constructor(obj: T) {
    const proxyObj = this.createProxy(obj);
    this.primaryObj = obj;
    this.proxyObj = proxyObj as T;
  }

  createProxy(obj: Object): T {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    const that = this;
    const proxyObj = new Proxy(obj, {
      get(target, p) {
        if (typeof target[p] === 'object' && target[p] !== null) {
          return (
            that.primaryToProxyMap.get(target[p]) || that.createProxy(target[p])
          );
        }
        return target[p];
      },
      set(target, p, value: unknown): boolean {
        if (Object.is(target[p], value)) {
          return true;
        }
        const res = Reflect.set(target, p, value);
        that.runEffectQueue();
        return res;
      },
    });
    that.primaryToProxyMap.set(obj, proxyObj);
    return proxyObj as T;
  }

  initialize(obj: T) {
    const proxyObj = this.createProxy(obj) as T;
    this.primaryObj = obj;
    this.proxyObj = proxyObj;
  }
  reset(obj: T, filter: EffectFunc<T>[] = []) {
    if (diff(obj, this.primaryObj) === true) {
      return;
    }
    this.initialize(obj);
    this.runEffectQueue(filter);
  }

  addEffect(Effect: EffectFunc<T>) {
    this.effectQueue.add(Effect);
  }

  removeEffect(Effect: EffectFunc<T>) {
    this.effectQueue.delete(Effect);
  }
  runEffect(fn: EffectFunc<T>, schedular = {}) {
    this.currEffect = fn;
    const res = fn.call(null, this.proxyObj);
    this.currEffect = null;
    return res;
  }
  runEffectQueue = function (this: Observer<T>, filter: EffectFunc<T>[] = []) {
    [...this.effectQueue]
      .filter((f) => !filter.includes(f) && f !== this.currEffect)
      .forEach((F) => this.runEffect(F));
  };
}

export default Observer;
