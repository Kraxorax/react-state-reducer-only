// import { useReducer } from "react"

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

export const StepNumberComp = (props: {state: StepNumberState, dispatch: Function }) => {
  const { state, dispatch } = props;
  // const [state, dispatch] = useReducer(stepNumberReducer, initStepNumberState);

  return (<div>
    <h3>Step number:</h3>
    <input type={'text'} value={state.stepNum}
    onChange={(e) => dispatch({ type: "updateStepNum", payload: e.target.value })} />
  </div>)
}