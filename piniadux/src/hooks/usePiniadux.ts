import { useEffect, useLayoutEffect, useRef } from 'react';
import { defineStore, IOption } from '../core/defineStore';
import useForceUpdate from './useForceUpdate';

const useStore = <store extends Object>(val: store) => {
  //为了在React开发者工具上有显示
  const storeRef = useRef(val);
  storeRef.current = val;
  return storeRef;
};

/**
 *
 * @param id
 * @param option
 * @returns IState
 * @example
 * const {store} = usePiniadux("key", {
 *  state() {
 *   return {
 *      hello: 1,
 *    };
 *  },
 *});
 */
function usePiniadux<IState extends Object>(
  id: string | symbol,
  option?: IOption<IState>,
) {
  const store = defineStore(id, option);
  useStore(store.store);
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    const removeTasks: (() => void)[] = [];

    //把update任务放到最后
    const update = () => {
      forceUpdate();
    };
    removeTasks.push(() => {
      store.observer.removeTask(update);
    });
    store.observer.addTask(update);
    return () => {
      removeTasks.forEach((f) => f());
    };
  }, []);
  return store;
}

export default usePiniadux;
export { usePiniadux };
