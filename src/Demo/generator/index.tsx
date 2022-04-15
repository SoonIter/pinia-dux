import React from 'react';
import { useRef } from 'react';

function* gen(): any {
  console.log('小明');
  yield;
  console.log('死了');
  yield;
  yield* gen();
}

function App() {
  const it = useRef(gen());
  return <button onClick={() => it.current.next()}></button>;
}

export default App;
