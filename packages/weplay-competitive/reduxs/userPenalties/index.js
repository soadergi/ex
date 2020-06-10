import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: USER_PENALTIES_RN,
  actions: userPenaltiesActions,
  selectors: userPenaltiesSelectors,
  reducer: userPenaltiesReducer,
} = createCollectionRedux({
  domain: 'user-penalty',
  service: 'penalty-service',
  pathToRoot: ['COMPETITIVE'],
  apiVersion: 1,
})
