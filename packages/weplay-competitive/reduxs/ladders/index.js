import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: LADDER_RN,
  actions: laddersActions,
  selectors: laddersSelectors,
  reducer: laddersReducer,
} = createCollectionRedux({
  domain: 'ladder',
  service: 'ladder-service',
  pathToRoot: ['COMPETITIVE'],
  apiVersion: 1,
})
