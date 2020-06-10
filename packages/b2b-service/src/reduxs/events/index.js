import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: EVENTS_RN,
  actions: eventsActions,
  selectors: eventsSelectors,
  reducer: eventsReducer,
} = createCollectionRedux({
  domain: 'events',
  service: 'b2b-events-service',
  pathToRoot: ['B2B'],
  apiVersion: 1,
})
