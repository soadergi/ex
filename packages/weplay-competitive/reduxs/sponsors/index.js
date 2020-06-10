import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: SPONSORS_RN,
  actions: sponsorsActions,
  selectors: sponsorsSelectors,
  reducer: sponsorsReducer,
} = createCollectionRedux({
  domain: 'sponsor',
  service: 'tournament-service',
  pathToRoot: ['COMPETITIVE'],
})
