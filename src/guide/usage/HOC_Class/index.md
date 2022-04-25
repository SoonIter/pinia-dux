---
title: 类组件中使用HOC
group:
  path: /guide/usage
---

# 类组件 使用 withPiniadux 的 hoc

```tsx
import React, { Component } from 'react';
import { withPiniadux } from 'piniadux';
class Demo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>name: {this.props.piniadux.store.user.name}</div>;
  }
}
export default withPiniadux('storeName', Demo, {
  state() {
    return {
      user: {
        name: 'xiaoming',
      },
    };
  },
});
```

你或许觉得这个调用链实在是太长，太不方便了。

piniadux 为了调用简便，采用了暴力更新的方式，即所有使用该 store 的组件都会更新。（之后或许会优化）

所以你使用解构或者其他什么方法，简化你的调用也是 ok 的。如下面这个示例中的最佳实践

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

class Demo extends Component {
  constructor(props) {
    super(props);
    this.store = props.piniadux.store;
  }
  render() {
    const { user } = this.store;
    const { age } = user;
    return (
      <>
        <div>
          <div>name: {this.store.user.name}</div>
          <div>name: {user.name}</div>
          <button onClick={() => user.age++}>age:{user.age}</button>
          <button onClick={() => user.age++}>age:{age}</button>
        </div>
      </>
    );
  }
}
export default withUserStore(Demo);
```

！！！set 时至少留一层对象，保证 proxy 的响应式

```tsx | pure
<>
  <div>
    <button onClick={() => user.age++}>age:{user.age}</button> ✅
    <button onClick={() => age++}>age:{age}</button> ❌
  </div>
</>
```
