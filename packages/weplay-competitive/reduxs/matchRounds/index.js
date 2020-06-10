import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: MATCH_ROUND_RN,
  actions: matchRoundActions,
  selectors: matchRoundSelectors,
  reducer: matchRoundReducer,
} = createCollectionRedux({
  domain: 'match-round',
  service: 'tournament-service',
  pathToRoot: ['COMPETITIVE'],
})
