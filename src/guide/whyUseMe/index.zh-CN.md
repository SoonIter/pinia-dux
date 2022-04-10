---
title: 起因
order: 1
group:
  path: /whyUseMe
  title: 关于Piniadux
  order: 3
---

# 来源

Pinia API 可以说是大大简化了使用 store 的流程，既可以直接对 state 里的数据进行操作，又可以通过 patch 进行一些固定的复杂操作。
而 React 要写大量的 Context Provider + useReducer，相比之下 proxy 的依赖收集显然性能更高而且更实惠。

所以我写了一个方便使用 state 的方法，帮我抛弃烦人的 Context。
