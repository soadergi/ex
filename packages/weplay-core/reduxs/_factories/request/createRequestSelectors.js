import * as R from 'ramda'

export const createRequestSelectors = pathArray => ({
  dataSelector: R.path([...pathArray, 'data']),
  loadingSelector: R.path([...pathArray, 'loading']),
  errorSelector: R.path([...pathArray, 'error']),
})
