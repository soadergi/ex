import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: ORGANIZERS_RN,
  actions: organizersActions,
  selectors: organizersSelectors,
  reducer: organizersReducer,
} = createCollectionRedux({
  domain: 'organizer',
  service: 'tournament-service',
  pathToRoot: ['COMPETITIVE'],
})
