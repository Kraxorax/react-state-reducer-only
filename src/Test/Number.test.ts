import fc from 'fast-check'
import { NumberAction, numberReducer, NumberState } from '../Components/Number'
import { stepNumberStateGen } from './StepNumber.test';

export const numberStateGen = () => fc.record({
  num: fc.integer(),
  stepNumberState: stepNumberStateGen()
})

const incrementGen = () => fc.record(
  { state: numberStateGen(),
    action: fc.record({ type: fc.constant('increment') })});

const decrementGen = () => fc.record(
  { state: numberStateGen(),
    action: fc.record({ type: fc.constant('decrement') })});

const anyActionGen = () => fc.record(
  { state: numberStateGen(),
    action: fc.record({ type: fc.string() })})

/**
 * This will fail test as action cannot be 'anything' it has to have 'type' property..
 */
const chaosGen = () => fc.record(
  { state: numberStateGen(),
    action: fc.anything()});

describe('Number component', () => {
  it('should increment', () => {
    fc.assert(fc.property(incrementGen(), (input) => {
      const resultState = numberReducer(input.state as NumberState, input.action as NumberAction)
      return resultState.num === input.state.num + input.state.stepNumberState.stepNum
    }));
  })

  it('should decrement', () => {
    fc.assert(fc.property(decrementGen(), (input) => {
      const resultState = numberReducer(input.state as NumberState, input.action as NumberAction)
      return resultState.num === input.state.num - input.state.stepNumberState.stepNum
    }));
  })

  it('will not fail on any action', () => {
    fc.assert(fc.property(anyActionGen(), (input) => {
      const resultState = numberReducer(input.state as NumberState, input.action as NumberAction)

      expect(resultState).toEqual(input.state)
    }));
  })

  it('will not error out ever', () => {
    fc.assert(fc.property(chaosGen(), (input) => {
      numberReducer(input.state as NumberState, input.action as NumberAction)
      return true
    }));
  })
})


