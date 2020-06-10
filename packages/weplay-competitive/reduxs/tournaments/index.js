import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: TOURNAMENTS_RN,
  actions: tournamentsActions,
  selectors: tournamentsSelectors,
  reducer: tournamentsReducer,
} = createCollectionRedux({
  domain: 'tournament',
  service: 'tournament-service',
  pathToRoot: ['COMPETITIVE'],
})
