import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: MEMBER_INFO_RN,
  actions: memberInfoActions,
  selectors: memberInfoSelectors,
  reducer: memberInfoReducer,
} = createCollectionRedux({
  domain: 'member-info',
  service: 'tournament-service',
  pathToRoot: ['COMPETITIVE'],
  apiVersion: '3',
})
