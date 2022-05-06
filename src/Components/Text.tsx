/**
 * A component module is the place for defining its own state, actions, and reducer.
 */
import { memo } from 'react';
import { isSameState } from '../Util/util';

export type TextState = {
  text: string;
}

export const initTextState = {
  text: "",
}

export type TextAction
  = {type: "setText", payload: string}
  | {type: "appendText", payload: string}

export const textReducer = (state: TextState, action: TextAction) => {
  switch (action.type) {
    case "setText":
      return { text: action.payload };
    case "appendText":
      return { text: state.text + action.payload };
    default:
      return state;
  }
}


export const Text = (props: {state: TextState, dispatch: Function }) => {
  // State and dispatch are passed as props. Hooked in main component.
  const { state, dispatch } = props;

  return (<div>
    <h2>Text</h2>
    <p>{state.text}</p>
    <input type={'text'} value={state.text} onChange={(e) => dispatch({ type: "setText", payload: e.target.value })} />
    <button onClick={() => dispatch({ type: "appendText", payload: state.text })}>Append</button>
  </div>)
}

/**
 * Components that are memoized are not re-rendered if props don't change, in this case their state.
 * This only works because component does not side-effect,
 * meaning it does not use 'useState', 'useReducer', or 'useContext' hooks.
 */
export const TextComp = memo(Text, isSameState);

