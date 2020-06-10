import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: PRIZES_RN,
  actions: prizesActions,
  selectors: prizesSelectors,
  reducer: prizesReducer,
} = createCollectionRedux({
  domain: 'prize',
  service: 'promo-events-service',
  pathToRoot: ['EVENTS'],
})
