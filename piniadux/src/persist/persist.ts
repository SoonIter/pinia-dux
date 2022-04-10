function parseLocalStorage(localData: string) {
  return JSON.parse(window.atob(localData));
}

function stringifyLocalStorage(data: any) {
  return window.btoa(JSON.stringify(data));
}

function debounce(fn: Function, delay: number = 500) {
  let timer: null | number = null;
  const setT = window?.setTimeout || setTimeout;
  return function (this: any, ...args: any[]) {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setT(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}
const setLocalStorage = debounce((key: string, value: any) => {
  localStorage.setItem(key, stringifyLocalStorage(value));
}, 500);

//proxy代理一层
const persistByKey = <T extends Object>(key: string, initialValue: T) => {
  const temp = localStorage.getItem(key);
  let obj: T;
  if (temp === null) {
    setLocalStorage(key, initialValue);
    obj = initialValue;
  } else {
    try {
      const local = parseLocalStorage(temp);
      if (local instanceof Object) {
        obj = local;
      } else {
        obj = initialValue;
      }
    } catch (e) {
      console.error('Piniadux:Error:localStorage is modified by user.');
      obj = initialValue;
      setLocalStorage(key, initialValue);
    }
  }

  const proxyObj = new Proxy(obj, {
    //@ts-ignore
    set(target: T, p: keyof T, value: any): boolean {
      target[p] = value;
      setLocalStorage(key, target);
      return true;
    },
    //@ts-ignore
    get(target: T, p: keyof T): any {
      return target[p];
    },
  });
  return proxyObj as T;
};
export default persistByKey;
export { persistByKey };
