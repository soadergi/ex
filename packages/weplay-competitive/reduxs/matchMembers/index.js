import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: MATCH_MEMBERS_RN,
  actions: matchMembersActions,
  selectors: matchMembersSelectors,
  reducer: matchMembersReducer,
} = createCollectionRedux({
  domain: 'match-member',
  service: 'tournament-service',
  pathToRoot: ['COMPETITIVE'],
})
