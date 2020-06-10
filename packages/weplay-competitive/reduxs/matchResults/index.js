import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: MATCH_RESULT_RN,
  actions: matchResultActions,
  selectors: matchResultSelectors,
  reducer: matchResultReducer,
} = createCollectionRedux({
  domain: 'match-result',
  service: 'tournament-service',
  pathToRoot: ['COMPETITIVE'],
})
