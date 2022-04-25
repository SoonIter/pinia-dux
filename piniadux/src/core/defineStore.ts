import Observer from './Observer';
import { EffectCallback } from 'react';

interface IOption<IState extends Object> {
  state: () => IState;
  pageState?: boolean;
}

const storeBucket = new Map(); //存储所有id => observer
const channelBucket = new Map(); //存储所有id => BroadcastChannel
function defineStore<IState extends Object>(
  id: string | Symbol,
  option?: IOption<IState>,
) {
  let observer: Observer<IState>;
  if (storeBucket.has(id)) {
    observer = storeBucket.get(id);
  } else {
    if (option?.state === undefined) {
      throw new ReferenceError(
        //第一次useState必须要初始化state
        'The first initialization of the piniadux requires option.state',
      );
    }
    observer = new Observer(option!.state());
    storeBucket.set(id, observer);
  }
  const reset = (newState?: IState) => {
    observer.reset(newState || option!.state());
  };

  if (option?.pageState === true) {
    const channelId = `pinia-${id}`;
    if (!channelBucket.has(channelId)) {
      const channel = new BroadcastChannel(channelId);
      const emit = (newState) => {
        channel.postMessage(newState);
      };
      channel.onmessage = ({ data }) => {
        if (data === 'need update' + channelId) {
          channel.postMessage(observer.primaryObj);
          return;
        }
        observer.reset(data, [emit]);
      };
      channelBucket.set(channelId, channel);
      channel.postMessage('need update' + channelId);
      observer.addTask(emit);
    }
  }
  return {
    store: observer.proxyObj,
    reset,
    observer: observer,
  };
}

function getStoreById(id: string) {
  const store = defineStore(id);
  return store;
}

function removeStoreTaskById(id: string, task: EffectCallback) {
  const store = getStoreById(id);
  store.observer.removeTask(task);
}

function addStoreTaskById(id: string, task: EffectCallback) {
  const store = getStoreById(id);
  store.observer.addTask(task);
}

export { defineStore, getStoreById, addStoreTaskById, removeStoreTaskById };
export type { IOption };
