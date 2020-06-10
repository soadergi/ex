import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: TOURNAMENT_MEMBER_INVITATIONS_RN,
  actions: tournamentMemberInvitationsActions,
  selectors: tournamentMemberInvitationsSelectors,
  reducer: tournamentMemberInvitationsReducer,
} = createCollectionRedux({
  domain: 'tournament-member-invitations',
  service: 'tournament-service',
  pathToRoot: ['COMPETITIVE'],
})
