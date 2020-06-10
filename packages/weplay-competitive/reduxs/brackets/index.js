import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: BRACKETS_RN,
  actions: bracketsActions,
  selectors: bracketsSelectors,
  reducer: bracketsReducer,
} = createCollectionRedux({
  domain: 'bracket',
  service: 'tournament-service',
  pathToRoot: ['COMPETITIVE'],
})
