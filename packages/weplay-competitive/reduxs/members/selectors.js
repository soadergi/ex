import { createSelector } from 'reselect'
import * as R from 'ramda'

import { userIdSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import { membersSelectors } from 'weplay-competitive/reduxs/members/index'

export const createMemberByIdSelector = mapPropsToMemberId => createSelector(
  [membersSelectors.createRecordByIdSelector(mapPropsToMemberId)],
  member => ({
    ...R.omit([
      'user',
    ])(member),
    ...R.omit([
      'nickname',
      'registrationDate',
    ])(member.user),
    name: R.pathOr('', ['user', 'nickname'], member),
    createDatetime: R.pathOr('', ['user', 'registrationDate'], member),
  }),
)

export const currentMemberSelector = createSelector(
  [
    membersSelectors.getRecordByIdSelector,
    userIdSelector,
  ],
  (getMemberById, userId) => getMemberById(userId),
)

export const isPremiumAccountSelector = createSelector(
  [
    currentMemberSelector,
  ],
  currentMember => R.pathOr(false, ['user', 'isPremiumAccount'], currentMember),
)

export const createMemberSteamIdSelector = memberId => createSelector(
  [membersSelectors.createRecordByIdSelector(memberId)],
  member => member?.user?.steamId,
)
