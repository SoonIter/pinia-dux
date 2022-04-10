---
title: 类组件中使用HOC
group:
  path: /guide/usage
---

# 使用 withPiniadux 的 hoc

```tsx
import React, { Component } from 'react';
import { withPiniadux } from 'piniadux';
class Demo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>{this.props.piniadux.store.user.name}</div>;
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

所以你使用解构或者其他什么方法，简化你的调用也是 ok 的。如下面这个示例

```tsx
import React, { Component } from 'react';
import { withPiniadux } from 'piniadux';
class Demo extends Component {
  constructor(props) {
    super(props);
    this.store = props.piniadux.store;
  }
  render() {
    const { user } = this.store;
    return (
      <>
        <div>
          <div>{this.store.user.name}</div>
          <div>{user.name}</div>
        </div>
      </>
    );
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

！！！至少留一层对象，因为使用了 proxy
