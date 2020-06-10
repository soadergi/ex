import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { userIdSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import { setVotingVote } from 'weplay-events/reduxs/voting/actions'
import { getVotingVoteByIdSelector } from 'weplay-events/reduxs/voting/selectors'
import { getVotingVoteRequest } from 'weplay-events/services/voting-service'
import getResponseDataWithIdKey from 'weplay-events/helpers/getResponseDataWithIdKey'

function useVotingUserChoice(votingId) {
  const dispatch = useDispatch()
  const userId = useSelector(userIdSelector)
  const getVotingVoteSelector = useSelector(getVotingVoteByIdSelector)

  const vote = useMemo(() => getVotingVoteSelector(votingId), [getVotingVoteSelector, votingId])

  useEffect(() => {
    if (!votingId || !userId || vote) {
      return
    }

    getVotingVoteRequest({ votingId, idAtChannel: userId })
      .then(votingVoteResponse => dispatch(setVotingVote(getResponseDataWithIdKey(votingVoteResponse, votingId))))
      .catch((error) => { console.warn(error) })
  }, [votingId, userId, vote, dispatch])

  return vote
}

export default useVotingUserChoice
