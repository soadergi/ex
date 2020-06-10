import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: TOURNAMENT_COMPANIES_RN,
  actions: tournamentCompanyActions,
  selectors: tournamentCompanySelectors,
  reducer: tournamentCompanyReducer,
} = createCollectionRedux({
  domain: 'tournament-company',
  service: 'promo-events-service',
  pathToRoot: ['EVENTS'],
})
