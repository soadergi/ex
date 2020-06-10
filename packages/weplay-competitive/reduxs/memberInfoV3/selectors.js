import * as R from 'ramda'
import { createSelector } from 'reselect'

import { userIdSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import { memberInfoSelectors } from './index'

export const createMemberInfoByIdSelector = mapPropsToMemberId => createSelector(
  [memberInfoSelectors.createRecordByIdSelector(mapPropsToMemberId)],
  memberInfo => ({
    ...R.omit([
      'nickname',
      'registrationDate',
    ])(memberInfo),
    name: memberInfo?.nickname ?? '',
    createDatetime: memberInfo?.registrationDate ?? '',
  }),
)

export const currentMemberInfoSelector = createSelector(
  [
    memberInfoSelectors.getRecordByIdSelector,
    userIdSelector,
  ],
  (getMemberInfoById, userId) => getMemberInfoById(userId),
)

export const isPremiumAccountSelector = createSelector(
  [
    currentMemberInfoSelector,
  ],
  currentMemberInfo => currentMemberInfo?.isPremiumAccount ?? false,
)
