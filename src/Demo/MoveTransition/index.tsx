import React, { FC, RefObject, useReducer, useRef, useState } from 'react';

import { useMoveTransition } from 'piniadux';

const id = Symbol('id');

const Demo: FC = (props) => {
  const el = useRef(null);
  useMoveTransition(el, id);
  return (
    <>
      <div
        ref={el}
        style={{ width: '80px', height: '80px', border: '1px solid red' }}
      />
    </>
  );
};

export default () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setShow((s) => !s);
        }}
      >
        show
      </button>
      {show ? (
        <Demo />
      ) : (
        <div>
          <div style={{ height: 80, width: 80 }} />
          <Demo />
        </div>
      )}
    </>
  );
};
