import React from 'react';
import { usePiniadux } from 'piniadux';
const useUserStore = () =>
  usePiniadux('user1', {
    state() {
      return {
        user: {
          name: 'xiaoming',
          age: 1,
        },
      };
    },
  });
function Demo() {
  const { store } = useUserStore();
  return (
    <>
      <div>Demo组件 {store.user.name}</div>
      <button
        onClick={() => {
          store.user.age++;
        }}
      >
        {store.user.age}
      </button>
    </>
  );
}

export default () => {
  return (
    <>
      <Demo />
      <Demo />
    </>
  );
};
