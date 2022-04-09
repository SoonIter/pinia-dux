import {useEffect, useRef} from "react";
import {defineStore} from "../core/defineStore";
import type {IOption} from "../types/IOption"
import useForceUpdate from "./useForceUpdate";


const useStore = <store extends Object>(val: store) => {
    //为了在React开发者工具上有显示
    const store = useRef(val);
    store.current = val;
    return store.current;
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
function usePiniadux<IState extends Object>(id: string | symbol, option?: IOption<IState>) {
    const store = defineStore(id, option);
    const latestStore = useStore(store.store as any);
    const forceUpdate = useForceUpdate();
    useEffect(() => {
        const update = () => {
            forceUpdate();
        }
        store.observer.addTask(update);
        return () => {
            store.observer.removeTask(update)
        }
    }, [forceUpdate, store]);
    return {store: latestStore};
}


export {usePiniadux};
