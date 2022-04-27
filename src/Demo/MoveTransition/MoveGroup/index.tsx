import React, { FC, useReducer, useRef, useState } from 'react';

import useMoveTransition from '../../../../piniadux/src/hooks/useMoveTransition';
import { usePiniadux } from '../../../../piniadux/index';

const Demo: FC<{ id: string }> = (props) => {
  const el = useRef<HTMLDivElement>(null);
  const { id } = props;
  const idRef = useRef(id);
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
