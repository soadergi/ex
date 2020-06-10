import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: TOURNAMENT_RN,
  actions: tournamentActions,
  selectors: tournamentSelectors,
  reducer: tournamentReducer,
} = createCollectionRedux({
  domain: 'tournament',
  service: 'promo-events-service',
  pathToRoot: ['EVENTS'],
  apiVersion: 1,
})
