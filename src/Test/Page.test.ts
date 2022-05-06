/**
 * Test suit for the page component
 */

import fc from 'fast-check'
import { initPageState, PageAction, pageReducer } from '../Page/Page'
import { numberStateGen } from './Number.test'
import { textStateGen } from './Text.test'

/**
 * We generate full app state using generators defined in tests for descendants components
 */
const pageStateGen = () => fc.record({
  numberState: numberStateGen(),
  textState: textStateGen(),
  result: fc.string()
})

/**
 * Some values are constant, as possible action types
 */
const calculateActionGen = () => fc.record({
  type: fc.constant('calculate'),
})

const resetActionGen = () => fc.record({
  type: fc.constant('reset'),
})

/**
 * We only test reducer for different actions.
 * Fast-check will generate different states for each action.
 */
describe('Page component', () => {
  it('calculates', () => {
    /**
     * This test is left failing for illustrative purposes.
     */
    fc.assert(fc.property(pageStateGen(), calculateActionGen(), (state, action) => {
      const resultState = pageReducer(state, action as PageAction)
      
      /**
       * It is up to us to decide properties of the result that are meaningful and to check them.
       */
      expect(resultState.result.length).toBeGreaterThanOrEqual(state.textState.text.length)
      expect(resultState.result).toContain(state.textState.text)
    }));
  })

  it('resets', () => {
    fc.assert(fc.property(pageStateGen(), resetActionGen(), (state, action) => {
      const resultState = pageReducer(state, action as PageAction)
      return expect(resultState).toEqual( initPageState)
    }));
  })
})

