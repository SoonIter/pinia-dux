import React, { FC, useReducer, useRef, useState } from 'react';

import { useMoveTransition, usePiniadux } from 'piniadux';

const Demo: FC<{ id: string }> = (props) => {
  const el = useRef<HTMLDivElement>(null);
  const { id } = props;
  useMoveTransition(el, id);
  return (
    <>
      <div
        ref={el}
        style={{ width: '80px', height: '80px', border: '1px solid red' }}
      >
        {id}
      </div>
    </>
  );
};

export default () => {
  const { store } = usePiniadux('DEMO', {
    state() {
      return {
        list: Array.from({ length: 8 }, (_, k) => k),
        show: true,
      };
    },
  });

  return (
    <>
      <button
        onClick={() => {
          store.show = !store.show;
          store.list.sort(() => Math.random() - 0.5);
        }}
      >
        {store.show ? 'toRight' : 'toLeft'} and shuffle
      </button>
      <div>
        {store.show ? (
          <div style={{ position: 'relative', left: 0 }}>
            {store.list.map((item, index) => (
              <Demo id={String(item)} key={item} />
            ))}
          </div>
        ) : (
          <div style={{ position: 'relative', left: 500 }}>
            {/* 多嵌套一层用于骗过React的diff算法 */}
            <div>
              {store.list.map((item, index) => (
                <Demo id={String(item)} key={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
