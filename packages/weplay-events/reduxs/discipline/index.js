import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: DISCIPLINE_RN,
  actions: disciplineActions,
  selectors: disciplineSelectors,
  reducer: disciplineReducer,
} = createCollectionRedux({
  domain: 'discipline',
  service: 'promo-events-service',
  pathToRoot: ['EVENTS'],
})
