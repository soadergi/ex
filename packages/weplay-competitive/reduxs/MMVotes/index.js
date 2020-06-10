import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: MM_VOTES_RN,
  actions: MMVotesActions,
  selectors: MMVotesSelectors,
  reducer: MMVotesReducer,
} = createCollectionRedux({
  domain: 'vote',
  service: 'matchmaking-voting-service',
  pathToRoot: ['COMPETITIVE'],
  apiVersion: 1,
})
