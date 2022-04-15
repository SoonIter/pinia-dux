import { useEffect, useRef } from 'react';
import { defineStore } from '../core/defineStore';
import useForceUpdate from './useForceUpdate';

interface IOption<IState extends Object> {
  state: () => IState;
}

const useStore = <store extends Object>(val: store) => {
  //为了在React开发者工具上有显示
  const storeRef = useRef(val);
  storeRef.current = val;
  return storeRef;
};

/*
 *
 * @example
 * const {store} = usePiniadux("key", {
 *  state() {
 *   return {
 *      hello: 1,
 *    };
 *  },
 *});
 * */
function usePiniadux<IState extends Object>(
  id: string | symbol,
  option?: IOption<IState>,
) {
  const store = defineStore(id, option);
  useStore(store.store);
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    const update = () => {
      forceUpdate();
    };
    store.observer.addTask(update);
    return () => {
      store.observer.removeTask(update);
    };
  }, []);
  return store;
}

export default usePiniadux;
export { usePiniadux };
