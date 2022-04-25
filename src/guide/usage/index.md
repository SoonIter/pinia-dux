---
title: 函数组件中使用 hook
order: 1
group:
  path: /guide/usage
  title: 使用
  order: 3
---

# 函数组件中使用 hook

这绝对是最简洁且最灵活的调用方式，相信你会爱不释手

## 同种组件共享同一 state

```tsx
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
```

## 不同组件共享同一 state

```tsx
import React from 'react';
import { usePiniadux } from 'piniadux';
const useUserStore = () =>
  usePiniadux('user2', {
    state() {
      return {
        user: {
          name: 'xiaoming',
          age: 1,
        },
      };
    },
  });
function Demo1() {
  const { store } = useUserStore();
  return (
    <>
      <div>Demo1组件 {store.user.name}</div>
      <button
        onClick={() => {
          store.user.age += 1;
        }}
      >
        点我加1 age:{store.user.age}
      </button>
    </>
  );
}
function Demo2() {
  const { store } = useUserStore();
  return (
    <>
      <div>Demo2组件 {store.user.name}</div>
      <button
        onClick={() => {
          store.user.age += 2;
        }}
      >
        点我加2 age:{store.user.age}
      </button>
    </>
  );
}
export default () => {
  return (
    <>
      <Demo1 />
      <Demo2 />
    </>
  );
};
```

## 支持使用 symbol 构建 state

```tsx
import React from 'react';
import { usePiniadux } from 'piniadux';
const USER = Symbol();
const useUserStore = () =>
  usePiniadux(USER, {
    state() {
      return {
        user: {
          name: 'symbol',
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
```
