import React from 'react';
import { usePiniadux } from 'piniadux';

function BroadcastChannelTest() {
  const { store } = usePiniadux('BroadcastChannelTest', {
    pageState: true,
    state() {
      return {
        followed: false,
      };
    },
  });
  return (
    <div
      style={{
        backgroundColor: store.followed ? 'gray' : 'pink',
        width: 80,
        height: 30,
        borderRadius: 10,
        lineHeight: '30px',
        textAlign: 'center',
        color: 'white',
      }}
      onClick={() => (store.followed = !store.followed)}
    >
      {store.followed ? 'followed' : 'follow me'}
    </div>
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
