/**
 * Main App component
 */
import { useReducer } from "react";
import { initNumberState, NumberAction, NumberComp, numberReducer, NumberState } from "../Components/Number"
import { initTextState, TextAction, TextComp, textReducer, TextState } from "../Components/Text"

/**
 * This type is used to define the state of the whole application.
 * Uses state types defined in child components.
 */
type PageState = {
  numberState: NumberState;
  textState: TextState;
  result: string;
}

/**
 * Initial state of the application is constructed using initial stated of child components.
 */
export const initPageState: PageState = {
  numberState: initNumberState,
  textState: initTextState,
  result: ""
}

/**
 * Action types of a component acknowledge actions of child components.
 */
export type PageAction =
  { type: "calculate" }
  | { type: "reset" }
  | TextAction
  | NumberAction

/**
 * Main reducer of the application. The only one that is hooked.
 * Again, it acknowledges state of child components by calling their reducers.
 */
export const pageReducer = (state: PageState, action: PageAction) => {
  // Child component reducers are called here.
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

/**
 * Main component where only one reducer is hooked for the whole application.
 */
export const PageComp = () => {
  const [pageState, dispatch] = useReducer(pageReducer, initPageState);
  
  return (
    <div>
      <h1>Page</h1>
      <button onClick={() => dispatch({ type: "calculate" })}>Calculate</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <p>Result: {pageState.result}</p>
      {/* Child components need to more props then their state and a function to change it. */}
      <NumberComp state={pageState.numberState} dispatch={dispatch} />
      <TextComp state={pageState.textState} dispatch={dispatch} />
    </div>
  )
}
