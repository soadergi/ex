import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: GAMES_RN,
  actions: gamesActions,
  selectors: gamesSelectors,
  reducer: gamesReducer,
} = createCollectionRedux({
  domain: 'game',
  service: 'promo-events-service',
  pathToRoot: ['EVENTS'],
  apiVersion: 1,
})
