import { useSelector } from 'react-redux'
import { useMemo } from 'react'

import { scoresSelectors } from 'weplay-competitive/reduxs/scores'
import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'
import { userScoreSelectors } from 'weplay-competitive/reduxs/userScores'

export const useLadderScores = () => {
  const scores = useSelector(scoresSelectors.allRecordsSelector)
  const currentMember = useSelector(currentMemberSelector)
  const getUserScoreById = useSelector(userScoreSelectors.getRecordByIdSelector)

  const userScore = useMemo(
    () => getUserScoreById(currentMember.id),
    [currentMember.id, getUserScoreById],
  )

  const sortedScores = useMemo(
    () => scores.sort((a, b) => b.score - a.score),
    [scores],
  )
  return {
    userScore,
    sortedScores,
  }
}
