import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: MM_GAME_MODES_RN,
  actions: MMGameModesActions,
  selectors: MMGameModesSelectors,
  reducer: MMGameModesReducer,
} = createCollectionRedux({
  domain: 'game-mode',
  service: 'game-settings-service',
  pathToRoot: ['COMPETITIVE'],
  apiVersion: 1,
})
