import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: USER_SCORE_RN,
  actions: userScoreActions,
  selectors: userScoreSelectors,
  reducer: userScoreReducer,
} = createCollectionRedux({
  domain: 'user-score',
  service: 'ladder-service',
  pathToRoot: ['COMPETITIVE'],
  apiVersion: 1,
})
