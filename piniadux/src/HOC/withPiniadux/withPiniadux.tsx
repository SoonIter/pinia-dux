import React, { Component, FC } from 'react';
import { usePiniadux } from '../../hooks/usePiniadux';

function withPiniadux(id: string | symbol, Comp: Component | FC, option?: any) {
  return function ReactComp(props) {
    const store = usePiniadux(id, option);
    //@ts-ignore
    return <Comp {...props} piniadux={store} />;
  };
}

export default withPiniadux;
