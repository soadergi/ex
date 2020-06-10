import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: TOURNAMENT_PLAYER_RN,
  actions: tournamentPlayerActions,
  selectors: tournamentPlayerSelectors,
  reducer: tournamentPlayerReducer,
} = createCollectionRedux({
  domain: 'tournament-player',
  service: 'promo-events-service',
  pathToRoot: ['EVENTS'],
  apiVersion: 1,
})
