import { useSelector } from 'react-redux'
import { useMemo } from 'react'

import { scoresSelectors } from 'weplay-competitive/reduxs/scores'

export const useLadderMembersIds = () => {
  const scores = useSelector(scoresSelectors.allRecordsSelector)

  const membersIds = useMemo(
    () => scores.map(member => member.userId).filter(member => member),
    [scores],
  )

  return membersIds
}
