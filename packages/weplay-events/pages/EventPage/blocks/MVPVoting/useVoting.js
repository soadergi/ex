import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setVotingItems } from 'weplay-events/reduxs/voting/actions'
import { getVotingByVotingIdSelector } from 'weplay-events/reduxs/voting/selectors'
import { getVotingItemsByVotingIdRequest } from 'weplay-events/services/voting-service'
import getResponseDataWithIdKey from 'weplay-events/helpers/getResponseDataWithIdKey'

function useVoting(votingId) {
  const dispatch = useDispatch()
  const getVotingItemsByVotingIdSelector = useSelector(getVotingByVotingIdSelector)

  const voting = useMemo(() => getVotingItemsByVotingIdSelector(votingId), [getVotingItemsByVotingIdSelector, votingId])

  useEffect(() => {
    if (!votingId || voting) {
      return
    }

    getVotingItemsByVotingIdRequest(votingId)
      .then(votingResponse => dispatch(setVotingItems(getResponseDataWithIdKey(votingResponse))))
      .catch((error) => { console.warn(error) })
  }, [voting, votingId, dispatch])

  return voting
}

export default useVoting
