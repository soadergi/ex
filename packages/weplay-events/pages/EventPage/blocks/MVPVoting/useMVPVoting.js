import { useMemo } from 'react'

import useVoting from 'weplay-events/pages/EventPage/blocks/MVPVoting/useVoting'
import useVotingUserChoice from 'weplay-events/pages/EventPage/blocks/MVPVoting/useVotingUserChoice'
import useVotingFrequency from 'weplay-events/pages/EventPage/blocks/MVPVoting/useVotingFrequency'
import useCurrentTournament from 'weplay-events/pages/EventPage/hooks/useCurrentTournament'
import { VOTING_IDS_BY_TOURNAMENT_SLUG } from 'weplay-events/services/voting-service/constants'

export default function useMVPVoting() {
  const tournament = useCurrentTournament()
  const { CORE_VOTING_ID, SUPPORT_VOTING_ID } = VOTING_IDS_BY_TOURNAMENT_SLUG[tournament.slug] ?? {}
  const votingCore = useVoting(CORE_VOTING_ID)
  const votingSupport = useVoting(SUPPORT_VOTING_ID)
  const votingCoreUserChoice = useVotingUserChoice(CORE_VOTING_ID)
  const votingSupportUserChoice = useVotingUserChoice(SUPPORT_VOTING_ID)
  const [nextVoteDateTimeCore, isAbleToVoteCore] = useVotingFrequency(votingCore, votingCoreUserChoice)
  const [nextVoteDateTimeSupport, isAbleToVoteSupport] = useVotingFrequency(votingSupport, votingSupportUserChoice)

  const closestVoteDateTime = useMemo(() => {
    if (nextVoteDateTimeCore < nextVoteDateTimeSupport) {
      return nextVoteDateTimeCore
    }
    if (nextVoteDateTimeSupport < nextVoteDateTimeCore) {
      return nextVoteDateTimeSupport
    }
    return null
  },
  [nextVoteDateTimeCore, nextVoteDateTimeSupport])

  return {
    votingCore,
    votingSupport,
    nextVoteDateTimeCore,
    nextVoteDateTimeSupport,
    isAbleToVoteCore,
    isAbleToVoteSupport,
    closestVoteDateTime,
  }
}
