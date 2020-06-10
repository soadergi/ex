import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'

import { SUB_API_ACTIONS } from 'weplay-core/consts/subApiActions'
import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import { userPenaltiesActions, userPenaltiesSelectors } from 'weplay-competitive/reduxs/userPenalties'
import { membersActions } from 'weplay-competitive/reduxs/members'
import { PENALTIES_NAMES } from 'weplay-competitive/constants/penalties'
import { MEMBER_STATUSES } from 'weplay-competitive/constants/memberStatuses'
import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'

export const useUserRestrictions = () => {
  const currentUser = useSelector(currentUserSelector)
  const currentMember = useSelector(currentMemberSelector)

  const dispatch = useDispatch()

  const userPenalties = useSelector(userPenaltiesSelectors.allRecordsSelector)

  const mmPenalty = useMemo(
    () => userPenalties.find(
      penalty => penalty.penaltyName === PENALTIES_NAMES.MM_CHECKIN_PENALTY && penalty.active,
    ),
    [userPenalties],
  )

  const isUserBanned = currentMember?.status === MEMBER_STATUSES.BANNED

  const hasRestrictions = Boolean(mmPenalty) || isUserBanned

  const handleUserRestrictions = () => Promise.all([
    dispatch(userPenaltiesActions.queryRecords.request({
      subApiAction: SUB_API_ACTIONS.ME,
    })),
    dispatch(membersActions.findRecord.request({
      id: currentUser.id,
    })),
  ])

  return { handleUserRestrictions, hasRestrictions }
}
