import { useSelector } from 'react-redux'

import { MATCH_ENDED_STATUSES } from 'weplay-competitive/constants/MM/matchStatuses'
import { MMMatchesSelectors } from 'weplay-competitive/reduxs/MMMatches'

const useIsMMMatchAvailable = (matchId) => {
  const MMMatch = useSelector(
    MMMatchesSelectors.createRecordByIdSelector(() => matchId),
  )
  return !MATCH_ENDED_STATUSES.includes(MMMatch.status)
}
export default useIsMMMatchAvailable
