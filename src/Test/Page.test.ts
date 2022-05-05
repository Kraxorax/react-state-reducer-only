import fc from 'fast-check'
import { initPageState, PageAction, pageReducer } from '../Page/Page'
import { numberStateGen } from './Number.test'
import { textStateGen } from './Text.test'

const pageStateGen = () => fc.record({
  numberState: numberStateGen(),
  textState: textStateGen(),
  result: fc.string()
})

const calculateActionGen = () => fc.record({
  type: fc.constant('calculate'),
})

const resetActionGen = () => fc.record({
  type: fc.constant('reset'),
})

describe('Page component', () => {
  it('calculates', () => {
    fc.assert(fc.property(pageStateGen(), calculateActionGen(), (state, action) => {
      const resultState = pageReducer(state, action as PageAction)
      
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

