import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setVotingResults } from 'weplay-events/reduxs/voting/actions'
import { getVotingResultsByIdSelector } from 'weplay-events/reduxs/voting/selectors'
import { getVotingResultsRequest } from 'weplay-events/services/voting-service'
import getResponseDataWithIdKey from 'weplay-events/helpers/getResponseDataWithIdKey'

function useVotingResults(votingId) {
  const dispatch = useDispatch()
  const getVotingResultsByVotingIdSelector = useSelector(getVotingResultsByIdSelector)
  const votingResults = useMemo(
    () => getVotingResultsByVotingIdSelector(votingId),
    [getVotingResultsByVotingIdSelector, votingId],
  )

  useEffect(() => {
    if (!votingId || votingResults) {
      return
    }

    getVotingResultsRequest({ votingId })
      .then(votingResultsResponse => dispatch(setVotingResults(getResponseDataWithIdKey(votingResultsResponse))))
      .catch((error) => { console.warn(error) })
  }, [votingResults, votingId, dispatch])

  return votingResults
}

export default useVotingResults
