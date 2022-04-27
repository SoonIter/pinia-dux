import { useReducer } from 'react';

function useForceUpdate() {
  const [_, forceUpdate] = useReducer(() => ({}), {});
  return forceUpdate;
}
export default useForceUpdate;
