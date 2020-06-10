import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: TOURNAMENT_MEMBERS_RN,
  actions: tournamentMembersActions,
  selectors: tournamentMembersSelectors,
  reducer: tournamentMembersReducer,
} = createCollectionRedux({
  domain: 'tournament-member',
  service: 'tournament-service',
  pathToRoot: ['COMPETITIVE'],
})
