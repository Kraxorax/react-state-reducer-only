import { isEqual } from 'lodash-es'

/**
 * Compares state prop for component memoization.
 * isEqual is used for deep comparison.
 */
export const isSameState = <P extends { state:any }>(prevProps: P, nextProps: P) => {
  const sameState = isEqual(prevProps.state, nextProps.state)
  return sameState;
}
