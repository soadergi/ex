import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: GAME_MODES_RN,
  actions: gameModesActions,
  selectors: gameModesSelectors,
  reducer: gameModesReducer,
} = createCollectionRedux({
  domain: 'game-mode',
  service: 'tournament-service',
  pathToRoot: ['COMPETITIVE'],
})
