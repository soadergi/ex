import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: STAGES_RN,
  actions: stageActions,
  selectors: stageSelectors,
  reducer: stageReducer,
} = createCollectionRedux({
  domain: 'stage',
  service: 'promo-events-service',
  pathToRoot: ['EVENTS'],
  apiVersion: 1,
})
