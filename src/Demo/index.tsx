import React, { FC } from 'react';
import { usePiniadux } from 'piniadux';

const USER = Symbol('user');
const useUserStore = () =>
  usePiniadux(USER, {
    state() {
      return {
        a: 10,
        b: 0,
        c: {
          d: 100,
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
        <div>c.d = {store.c.d}</div>
      </div>
    </>
  );
};
const Demo: FC = () => {
  const { store, reset } = useUserStore();
  // console.log('render Demo');
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
          store.c.d += 100;
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
