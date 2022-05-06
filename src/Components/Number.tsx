/**
 * An example of a component that gets state as prop but has its own child component.
 */
import { memo } from 'react';
import { isSameState } from '../Util/util';
import { initStepNumberState, StepNumberAction, StepNumberComp, stepNumberReducer, StepNumberState } from "./StepNumber"

/**
 * State of a component is defined in terms of child component state and its own state properties.
 */
export type NumberState = {
  num: number,
  stepNumberState: StepNumberState
}

export const initNumberState = {
  num: 0,
  stepNumberState: initStepNumberState
}

/**
 * Action types of a component acknowledge actions of child components.
 */
export type NumberAction =
  { type: "increment" | "decrement" }
  | StepNumberAction

/**
 * We have seen this in Page component.
 */
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

export const Number = (props: {state: NumberState, dispatch: Function }) => {
  /**
   * Does not have it's own hooks...
   */
  const { state, dispatch } = props;

  return (<div>
    <h2>Number</h2>
    <button onClick={() => dispatch({ type: "increment" })}>+</button>
    {state.num}
    <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    { /**
       *  ...but it has its own child component, and passes state and dispatch to it.
       */ }
    <StepNumberComp state={state.stepNumberState} dispatch={dispatch} />
  </div>)
}

export const NumberComp = memo(Number, isSameState);
