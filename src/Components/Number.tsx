import { initStepNumberState, StepNumberAction, StepNumberComp, stepNumberReducer, StepNumberState } from "./StepNumber"

export type NumberState = {
  num: number,
  stepNumberState: StepNumberState
}

export const initNumberState = {
  num: 0,
  stepNumberState: initStepNumberState
}

export type NumberAction =
  { type: "increment" | "decrement" }
  | StepNumberAction

export const numberReducer = (state: NumberState, action: NumberAction) => {
  state = { ...state, stepNumberState: stepNumberReducer(state.stepNumberState, action as StepNumberAction) }

  switch (action.type) {
    case "increment":
      return { ...state, num: state.num + state.stepNumberState.stepNum };
    case "decrement":
      return { ...state, num: state.num - state.stepNumberState.stepNum };
    default:
      return state;
  }
}

export const NumberComp = (props: {state: NumberState, dispatch: Function }) => {
  const { state, dispatch } = props;

  return (<div>
    <h2>Number</h2>
    <button onClick={() => dispatch({ type: "increment" })}>+</button>
    {state.num}
    <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    <StepNumberComp state={state.stepNumberState} dispatch={dispatch} />
  </div>)
}