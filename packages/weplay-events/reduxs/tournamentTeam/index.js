import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: TOURNAMENT_TEAM_RN,
  actions: tournamentTeamActions,
  selectors: tournamentTeamSelectors,
  reducer: tournamentTeamReducer,
} = createCollectionRedux({
  domain: 'tournament-team',
  service: 'promo-events-service',
  pathToRoot: ['EVENTS'],
  apiVersion: 1,
})
