import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: LOBBIES_RN,
  actions: lobbiesActions,
  selectors: lobbiesSelectors,
  reducer: lobbiesReducer,
} = createCollectionRedux({
  domain: 'lobby',
  service: 'tournament-service',
  pathToRoot: ['COMPETITIVE'],
})
