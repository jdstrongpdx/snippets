# React example useReducer

``` javaScript
import React, { useReducer } from 'react';

// Define your reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
};

function Counter() {
  // Use the reducer
  const [state, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      Current Count: {state}
      <button onClick={() => dispatch({type: 'increment'})}>Increment</button>
      <button onClick={() => dispatch({type: 'decrement'})}>Decrement</button>
    </div>
  );
}

export default Counter;