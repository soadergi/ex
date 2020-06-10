import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: SCORE_RN,
  actions: scoresActions,
  selectors: scoresSelectors,
  reducer: scoresReducer,
} = createCollectionRedux({
  domain: 'score',
  service: 'ladder-service',
  pathToRoot: ['COMPETITIVE'],
  apiVersion: 1,
})
