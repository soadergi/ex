import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: TOURNAMENT_RESOURCES_RN,
  actions: tournamentResourcesActions,
  selectors: tournamentResourcesSelectors,
  reducer: tournamentResourcesReducer,
} = createCollectionRedux({
  domain: 'media-resource',
  service: 'promo-events-service',
  pathToRoot: ['EVENTS'],
})
