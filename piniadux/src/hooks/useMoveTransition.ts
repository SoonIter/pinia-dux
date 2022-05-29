import { RefObject, useLayoutEffect } from 'react';
import usePiniadux from './usePiniadux';

function getRect(element: HTMLElement | null | undefined) {
  if (element === null || element === undefined)
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
    };
  const { top, bottom, left, right, width, height } =
    element.getBoundingClientRect();
  const scrollTop = window.scrollY;
  return {
    top: top + scrollTop,
    bottom,
    left,
    right,
    width,
    height,
  };
}
const useTransitionStore = (id: string | symbol) =>
  usePiniadux(id, {
    state() {
      return {
        x: 0,
        y: 0,
        hasPosition: false,
      };
    },
  });
const useMoveTransition = <T extends HTMLElement>(
  elRef: RefObject<T>,
  id: string | symbol,
) => {
  const { store } = useTransitionStore(id);
  //仅在挂载触发
  useLayoutEffect(() => {
    if (!store.hasPosition) {
      //首次挂载无需动画
      store.hasPosition = true;
      const { left, top } = getRect(elRef.current);
      store.x = left;
      store.y = top;
      return;
    }
    const { left, top } = getRect(elRef.current);
    const { y: lastY, x: lastX } = store;
    const dx = lastX - left;
    const dy = lastY - top;
    // 恢复原位
    elRef.current!.style.transitionDuration = '0s';
    elRef.current!.style.transform = `translate(${dx}px,${dy}px)`;
    requestAnimationFrame(() => {
      // 1s到达新位置
      elRef.current!.style.transitionDuration = '1s';
      elRef.current!.style.transform = `translate(0px,0px)`;
      store.x = left;
      store.y = top;
    });
  }, []);
};

export default useMoveTransition;
