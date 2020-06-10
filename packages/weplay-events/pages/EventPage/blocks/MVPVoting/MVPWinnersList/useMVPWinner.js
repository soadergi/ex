import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { getVotingCandidateByIdSelector } from 'weplay-events/reduxs/voting/selectors'
import useVotingResults from 'weplay-events/pages/EventPage/blocks/MVPVoting/useVotingResults'

const extractWinnerIdFromResults = (participantScores) => {
  const maxValueKey = Object.keys(participantScores).reduce(
    (participantIdWithMaxScore, participantId) => {
      if (participantIdWithMaxScore === null) {
        return participantId
      }

      if (participantScores[participantIdWithMaxScore] > participantScores[participantId]) {
        return participantIdWithMaxScore
      }

      return participantId
    },
    null,
  )

  return Number(maxValueKey)
}

export default function useMVPWinner(votingId, isTournamentEnded) {
  const getVotingCandidateSelector = useSelector(getVotingCandidateByIdSelector)

  const votingResults = useVotingResults(votingId)?.result ?? {}

  const votingWinnerId = useMemo(() => (isTournamentEnded
    ? extractWinnerIdFromResults(votingResults)
    : null),
  [isTournamentEnded, votingResults])

  const votingWinner = useMemo(() => getVotingCandidateSelector(votingId, votingWinnerId),
    [getVotingCandidateSelector, votingId, votingWinnerId])

  return votingWinner
}
