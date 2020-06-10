import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: NODES_RN,
  actions: nodesActions,
  selectors: nodesSelectors,
  reducer: nodesReducer,
} = createCollectionRedux({
  domain: 'node',
  service: 'tournament-service',
  pathToRoot: ['COMPETITIVE'],
})
