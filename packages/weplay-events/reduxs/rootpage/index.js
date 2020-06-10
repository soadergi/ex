import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: ROOTPAGE_RN,
  actions: rootpageActions,
  selectors: rootpageSelectors,
  reducer: rootpageReducer,
} = createCollectionRedux({
  domain: 'content-page',
  service: 'promo-events-service',
  pathToRoot: ['EVENTS'],
  apiVersion: 1,
})
