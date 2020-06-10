import { useMemo } from 'react'

import useCurrentTournamentStatus from 'weplay-events/pages/EventPage/hooks/useCurrentTournamentStatus'

const minutesToMillisecondsMultiplier = 60 * 1000

function useVotingFrequency(voting, votingUserChoice) {
  const { isEnded } = useCurrentTournamentStatus()
  const votingFrequency = voting?.frequency?.site

  const lastVoteDateTime = useMemo(() => {
    if (!votingUserChoice?.time) {
      return null
    }
    return new Date(votingUserChoice.time)
  }, [votingUserChoice])

  const nextVoteDateTime = useMemo(() => {
    if (!lastVoteDateTime || !votingFrequency) {
      return null
    }
    return new Date(lastVoteDateTime.getTime() + votingFrequency * minutesToMillisecondsMultiplier)
  },
  [lastVoteDateTime, votingFrequency])

  const isVotingClosedOrHidden = useMemo(() => isEnded || voting?.closed || voting?.hidden, [voting, isEnded])

  const isAbleToVote = useMemo(() => {
    if (isVotingClosedOrHidden) {
      return false
    }
    if (!nextVoteDateTime) {
      return true
    }
    return nextVoteDateTime < new Date()
  },
  [nextVoteDateTime, isVotingClosedOrHidden])

  return [nextVoteDateTime, isAbleToVote]
}

export default useVotingFrequency
