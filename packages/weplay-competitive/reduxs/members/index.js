import { createCollectionRedux } from 'weplay-core/reduxs/_factories/collection'

export const {
  REDUCER_NAME: MEMBER_RN,
  actions: membersActions,
  selectors: membersSelectors,
  reducer: membersReducer,
} = createCollectionRedux({
  domain: 'member',
  service: 'tournament-service',
  pathToRoot: ['COMPETITIVE'],
})
