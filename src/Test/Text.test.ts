import fc from 'fast-check'
import { TextAction, textReducer } from '../Components/Text'

export const textStateGen = () => fc.record({
  text: fc.string()
})

export const setTextActionGen = (): fc.Arbitrary<TextAction> => fc.record({
  type: fc.constant('setText'),
  payload: fc.string()
})

export const appendTextActionGen = (): fc.Arbitrary<TextAction> => fc.record({
  type: fc.constant('appendText'),
  payload: fc.string()
})

describe('Text component', () => {
  it('sets text', () => {
    fc.assert(fc.property(textStateGen(), setTextActionGen(), (state, action) => {
      const resultState = textReducer(state, action)
      return resultState.text === action.payload
    }));
  })

  it('appends text', () => {
    fc.assert(fc.property(textStateGen(), appendTextActionGen(), (state, action) => {
      const resultState = textReducer(state, action)

      return expect(resultState.text).toBe(state.text + action.payload)
    }));
  })
})

