import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: GAME_MODE_RN,
  actions: gameModeActions,
  selectors: gameModeSelectors,
  reducer: gameModeReducer,
} = createCollectionRedux({
  domain: 'game-mode',
  service: 'promo-events-service',
  pathToRoot: ['EVENTS'],
})
