export type TextState = {
  text: string;
}

export const initTextState = {
  text: "",
}

export type TextAction = 
  {type: "setText", payload: string}
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

export const TextComp = (props: {state: TextState, dispatch: Function }) => {
  const { state, dispatch } = props;

  return (<div>
    <h2>Text</h2>
    <p>{state.text}</p>
    <input type={'text'} value={state.text} onChange={(e) => dispatch({ type: "setText", payload: e.target.value })} />
    <button onClick={() => dispatch({ type: "appendText", payload: state.text })}>Append</button>
  </div>)
}
