import { useReducer } from "react";
import { initNumberState, NumberAction, NumberComp, numberReducer, NumberState } from "../Components/Number"
import { initTextState, TextAction, TextComp, textReducer, TextState } from "../Components/Text"

type PageState = {
  numberState: NumberState;
  textState: TextState;
  result: string;
}

export const initPageState: PageState = {
  numberState: initNumberState,
  textState: initTextState,
  result: ""
}

export type PageAction =
  { type: "calculate" }
  | { type: "reset" }
  | TextAction
  | NumberAction

export const pageReducer = (state: PageState, action: PageAction) => {
  // Sub-reducers
  state = { ...state, numberState: numberReducer(state.numberState, action as NumberAction) }
  state = { ...state, textState: textReducer(state.textState, action as TextAction) }

  // Component state
  switch (action.type) {
    case "calculate":
      return {
        ...state,
        result: `${state.textState.text}\n`.repeat(state.numberState.num)
      };
    case "reset":
      return {
        ...initPageState
      };
    default:
      return state;
  }
}

export const Page = () => {
  const [pageState, dispatch] = useReducer(pageReducer, initPageState);
  
  return (
    <div>
      <h1>Page</h1>
      <button onClick={() => dispatch({ type: "calculate" })}>Calculate</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <p>Result: {pageState.result}</p>
      <NumberComp state={pageState.numberState} dispatch={dispatch} />
      <TextComp state={pageState.textState} dispatch={dispatch} />
    </div>
  )
}