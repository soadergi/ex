import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: MM_MATCHES_RN,
  actions: MMMatchesActions,
  selectors: MMMatchesSelectors,
  reducer: MMMatchesReducer,
} = createCollectionRedux({
  domain: 'match',
  service: 'matchmaking-service',
  pathToRoot: ['COMPETITIVE'],
  apiVersion: 1,
})
