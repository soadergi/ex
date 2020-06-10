import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: VOTE_ITEMS_RN,
  actions: voteItemsActions,
  selectors: voteItemsSelectors,
  reducer: voteItemsReducer,
} = createCollectionRedux({
  domain: 'vote-item',
  service: 'tournament-service',
  pathToRoot: ['COMPETITIVE'],
})
