import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: LOBBY_MAPS_RN,
  actions: lobbyMapsActions,
  selectors: lobbyMapsSelectors,
  reducer: lobbyMapsReducer,
} = createCollectionRedux({
  domain: 'lobby-map',
  service: 'tournament-service',
  pathToRoot: ['COMPETITIVE'],
})
