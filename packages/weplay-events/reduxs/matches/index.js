import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: MATCHES_RN,
  actions: matchesActions,
  selectors: matchesSelectors,
  reducer: matchesReducer,
} = createCollectionRedux({
  domain: 'match',
  service: 'promo-events-service',
  pathToRoot: ['EVENTS'],
  apiVersion: 1,
})
