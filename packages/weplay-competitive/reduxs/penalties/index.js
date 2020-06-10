import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: PENALTIES_RN,
  actions: penaltiesActions,
  selectors: penaltiesSelectors,
  reducer: penaltiesReducer,
} = createCollectionRedux({
  domain: 'penalty',
  service: 'penalty-service',
  pathToRoot: ['COMPETITIVE'],
  apiVersion: 1,
})
