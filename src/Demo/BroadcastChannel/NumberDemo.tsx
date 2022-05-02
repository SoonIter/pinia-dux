import React from 'react';
import { usePiniadux } from 'piniadux';

function BroadcastChannelTest() {
  const { store } = usePiniadux('BroadcastChannelTestNumber', {
    pageState: true,
    state() {
      return {
        followed: Math.random(),
      };
    },
  });
  return (
    <div onClick={() => (store.followed = Math.random())}>{store.followed}</div>
  );
}
export default () => {
  return (
    <>
      <BroadcastChannelTest />
      <BroadcastChannelTest />
    </>
  );
};
