import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: MM_QUEUES_RN,
  actions: MMQueuesActions,
  selectors: MMQueuesSelectors,
  reducer: MMQueuesReducer,
} = createCollectionRedux({
  domain: 'queue',
  service: 'matchmaking-queue-service',
  pathToRoot: ['COMPETITIVE'],
  apiVersion: 1,
})
