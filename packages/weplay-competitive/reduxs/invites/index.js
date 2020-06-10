import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: INVITES_RN,
  actions: invitesActions,
  selectors: invitesSelectors,
  reducer: invitesReducer,
} = createCollectionRedux({
  domain: 'invite',
  service: 'tournament-service',
  pathToRoot: ['COMPETITIVE'],
})
