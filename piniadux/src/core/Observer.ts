const setMicroTask = window?.requestIdleCallback || setTimeout;
const debounce = (fn, delay = 0) => {
  let timer: null | number = null;
  return function (this: any, ...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setMicroTask(() => {
      fn.apply(this, args);
    });
  };
};

type ValueOf<T> = T[keyof T];
type EffectFunc<T> = (newState?: T) => void;
type PropertyKey = string | symbol;

const currentState = {
  updateFunc: () => {},
};
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
  private globalEffectFuncQueue = new Set<EffectFunc<T>>();

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
        // that.addTask(currentState.updateFunc);
        return target[p];
      },
      set(target, p, value: unknown): boolean {
        if (!Object.is(target[p], value)) {
          Reflect.set(
            target,
            p,
            typeof value === 'object' && value !== null
              ? that.createProxy(value)
              : value,
          );

          that.runTaskQueue();
        }
        return true;
      },
    });
    let key: keyof typeof obj;
    for (key in obj) {
      if (typeof obj[key] === 'object') {
        obj[key] = this.createProxy(obj[key]) as any;
      }
    }
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
    this.runTaskQueue(filter);
  }

  addTask(Task: EffectFunc<T>) {
    this.globalEffectFuncQueue.add(Task);
  }

  removeTask(Task: EffectFunc<T>) {
    this.globalEffectFuncQueue.delete(Task);
  }

  runTaskQueue = debounce(function (
    this: Observer<T>,
    filter: EffectFunc<T>[] = [],
  ) {
    [...this.globalEffectFuncQueue]
      .filter((f) => !filter.includes(f))
      .forEach((F) => F(this.primaryObj));
  },
  0);
}

export default Observer;
