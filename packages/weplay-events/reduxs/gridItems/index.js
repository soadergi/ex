import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: GRID_ITEMS_RN,
  actions: gridItemsActions,
  selectors: gridItemsSelectors,
  reducer: gridItemsReducer,
} = createCollectionRedux({
  domain: 'grid-item',
  service: 'promo-events-service',
  pathToRoot: ['EVENTS'],
  apiVersion: 1,
})
