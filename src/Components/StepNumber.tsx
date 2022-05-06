/**
 * A leaf component is as simple as it can be.
 */

// import { useReducer } from "react"
import { memo } from 'react'
import { isSameState } from '../Util/util'

export type StepNumberState = {
  stepNum: number
}

export const initStepNumberState = {
  stepNum: 1
}

export type StepNumberAction = {
  type: "updateStepNum", payload: string
}

export const stepNumberReducer = (state: StepNumberState, action: StepNumberAction) => {
  switch (action.type) {
    case "updateStepNum":
      return { stepNum: parseFloat(action.payload) || 1 };
    default:
      return state;
  }
}

export const StepNumber = (props: {state: StepNumberState, dispatch: Function }) => {
  /**
   * In terms of refactioring - following two lines are the same.
   * A component that uses single reducer can easly pass hooking on to parent component.
   */
  const { state, dispatch } = props;
  // const [state, dispatch] = useReducer(stepNumberReducer, initStepNumberState);

  return (<div>
    <h3>Step number:</h3>
    <input type={'text'} value={state.stepNum}
    onChange={(e) => dispatch({ type: "updateStepNum", payload: e.target.value })} />
  </div>)
}

export const StepNumberComp = memo(StepNumber, isSameState);