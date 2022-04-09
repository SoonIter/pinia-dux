function parseLocalStorage(localData: string) {
  return JSON.parse(window.atob(localData));
}

function stringfyLocalStorage(data: any) {
  return window.btoa(JSON.stringify(data));
}

//proxy代理一层
const persistByKey = <T extends Object>(key: string, initialValue: T) => {
  const temp = localStorage.getItem(key);
  let obj: T;
  if (temp === null) {
    localStorage.setItem(key, JSON.stringify(initialValue));
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
      console.error("Error:localStorage is modified by user.");
      obj = initialValue;
    }
  }

  const proxyObj = new Proxy(obj, {
    //@ts-ignore
    set(target: T, p: keyof T, value: any): boolean {
      target[p] = value;
      localStorage.setItem(key, stringfyLocalStorage(target));
      return true;
    },
    //@ts-ignore
    get(target: T, p: keyof T): any {
      return target[p];
    },
  });
  console.log(proxyObj);
  return proxyObj as T;
};

export { persistByKey };
