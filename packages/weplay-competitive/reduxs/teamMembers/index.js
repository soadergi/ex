import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: TEAM_MEMBERS_RN,
  actions: teamMembersActions,
  selectors: teamMembersSelectors,
  reducer: teamMembersReducer,
} = createCollectionRedux({
  domain: 'team-member',
  service: 'tournament-service',
  pathToRoot: ['COMPETITIVE'],
})
