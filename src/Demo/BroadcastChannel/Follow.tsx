import React from 'react';
import { usePiniadux } from '../../../piniadux/src/hooks/usePiniadux';

function BroadcastChannelTest(props: { id: string }) {
  const { id } = props;
  const { store } = usePiniadux(id, {
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
      <div>Foo</div>
      <BroadcastChannelTest id="Foo" />
      <BroadcastChannelTest id="Foo" />
      <div>Bar</div>
      <BroadcastChannelTest id="Bar" />
      <BroadcastChannelTest id="Bar" />
    </>
  );
};
