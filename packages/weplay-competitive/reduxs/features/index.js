import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: FEATURES_RN,
  actions: featuresActions,
  selectors: featuresSelectors,
  reducer: featuresReducer,
} = createCollectionRedux({
  domain: 'feature',
  service: 'tournament-service',
  pathToRoot: ['COMPETITIVE'],
})
