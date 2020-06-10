import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: TEAMS_RN,
  actions: teamsActions,
  selectors: teamsSelectors,
  reducer: teamsReducer,
} = createCollectionRedux({
  domain: 'team',
  service: 'tournament-service',
  pathToRoot: ['COMPETITIVE'],
})
