import React, { FC } from 'react';
import { persistByKey, usePiniadux } from 'piniadux';

const USER = Symbol('user');
const useUserStore = () =>
  usePiniadux(USER, {
    state() {
      return {
        a: 10,
        b: 0,
        c: {
          d: persistByKey('ddddd', { a: 10 }),
        },
      };
    },
  });
const Demo2: FC = () => {
  const { store } = useUserStore();

  return (
    <>
      <div style={{ padding: '10px', margin: '10px', border: '1px solid red' }}>
        <div style={{ color: 'red' }}>Demo2</div>
        <div>a = {store.a}</div>
        <div>b = {store.b}</div>
        <div>c.d.a = {store.c.d.a}</div>
      </div>
    </>
  );
};
const Demo: FC = () => {
  const { store, reset } = useUserStore();
  return (
    <>
      <button
        onClick={() => {
          store.a++;
        }}
      >
        a++
      </button>
      <button
        onClick={() => {
          store.b++;
        }}
      >
        b++
      </button>
      <button
        onClick={() => {
          store.c.d.a += 100;
        }}
      >
        c.d++
      </button>
      <button
        onClick={() => {
          reset();
        }}
      >
        reset
      </button>
    </>
  );
};
const App = () => {
  return (
    <>
      <Demo2 />
      <Demo2 />
      <Demo />
    </>
  );
};
export default App;
