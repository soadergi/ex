import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: GRIDS_RN,
  actions: gridActions,
  selectors: gridSelectors,
  reducer: gridReducer,
} = createCollectionRedux({
  domain: 'grid',
  service: 'promo-events-service',
  pathToRoot: ['EVENTS'],
  apiVersion: 1,
})
