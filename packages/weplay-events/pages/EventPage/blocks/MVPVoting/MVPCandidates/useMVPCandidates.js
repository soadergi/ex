import {
  useMemo,
  useCallback,
  useEffect,
} from 'react'
import {
  useSelector,
  useDispatch,
} from 'react-redux'

import { setVotingVote } from 'weplay-events/reduxs/voting/actions'
import { voteRequest } from 'weplay-events/services/voting-service'
import { getVotingVoteByIdSelector } from 'weplay-events/reduxs/voting/selectors'

function useMVPCandidates({
  countdown,
  votingId,
  isEnded,
  isAbleToVote,
}) {
  const dispatch = useDispatch()
  const getVotingVoteSelector = useSelector(getVotingVoteByIdSelector)
  const lastVoteItemId = useMemo(() => getVotingVoteSelector(votingId)?.choiceId,
    [votingId, getVotingVoteSelector])

  const handleVote = useCallback(choiceId => voteRequest({ votingId, choiceId })
    .then(() => dispatch(setVotingVote({
      [votingId]: {
        choiceId,
        time: new Date(),
      },
    }))), [dispatch, votingId])

  useEffect(() => {
    if (!isEnded && !isAbleToVote && countdown.isPassed) {
      dispatch(setVotingVote({
        [votingId]: {}, // activates voting buttons
      }))
    }
  }, [countdown.isPassed, isEnded, dispatch,
    // votingId, // commented by purpose to prevent initial actuation
    // isAbleToVote, // commented by purpose to prevent initial actuation
  ])

  return { handleVote, lastVoteItemId }
}

export default useMVPCandidates
