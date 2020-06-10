import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: STAGE_RN,
  actions: stageActions,
  selectors: stageSelectors,
  reducer: stageReducer,
} = createCollectionRedux({
  domain: 'stage',
  service: 'tournament-service',
  pathToRoot: ['COMPETITIVE'],
})
