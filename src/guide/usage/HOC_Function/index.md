---
title: 函数组件中使用HOC
group:
  path: /guide/usage
---

```tsx
import React, { Component } from 'react';
import { withPiniadux } from 'piniadux';
const USER = Symbol('USER');
const withUserStore = (comp) =>
  withPiniadux(USER, comp, {
    state() {
      return {
        user: {
          name: 'xiaoming',
          age: 1,
        },
      };
    },
  });

const Demo = withUserStore(({ piniadux }) => {
  const { store } = piniadux;
  const { user } = store;
  return (
    <>
      <div>name: {store.user.name}</div>
      <button onClick={() => user.age++}>age: {user.age}</button>
    </>
  );
});
export default Demo;
```
