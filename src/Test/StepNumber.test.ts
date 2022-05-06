import fc from 'fast-check'
import { StepNumberAction, stepNumberReducer, StepNumberState } from '../Components/StepNumber';

export const stepNumberStateGen = () => fc.record({
  stepNum: fc.oneof( fc.integer(), fc.float())
})

export const stepNumberActionGen = () => fc.record({
  type: fc.constant('updateStepNum'),
  payload: fc.string()
})

export const inputGen = (stateGen: () => fc.Arbitrary<StepNumberState>) => fc.record(
  { state: stateGen(),
    action: stepNumberActionGen()
})

describe('Step Number Component', () => {
  it('works for any input', () => {
    fc.assert(fc.property(inputGen(stepNumberStateGen), (input) => {
      const resultState = stepNumberReducer(input.state, input.action as StepNumberAction)
      return typeof resultState.stepNum === 'number'
    }));
  })
})