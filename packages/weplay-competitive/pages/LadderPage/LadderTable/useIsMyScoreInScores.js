import { useSelector } from 'react-redux'
import { useMemo } from 'react'

import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'

import { useLadderMembersIds } from './useLadderMembersIds'

export const useIsMyScoreInScores = () => {
  const currentMember = useSelector(currentMemberSelector)

  const membersIds = useLadderMembersIds()

  const isMyScoreInScores = useMemo(
    () => membersIds.indexOf(currentMember.id) !== -1,
    [currentMember.id, membersIds],
  )

  return isMyScoreInScores
}
