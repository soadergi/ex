import { useSelector } from 'react-redux'

import { participantsSelectors } from 'weplay-events/reduxs/participants'

export default function useMatchParticipants({ match, matchBets }) {
  const getParticipantsByIdSelector = useSelector(participantsSelectors.getRecordByIdSelector)

  const participantsList = match.relationships?.participants ?? []
  const matchParticipants = participantsList.map(participant => (getParticipantsByIdSelector(participant.id)))

  const participantA = match.relationships?.participants?.[0]
  const participantB = match.relationships?.participants?.[1]

  const participantAData = matchParticipants?.find(p => p.id && p.id === participantA?.id)
  const participantBData = matchParticipants?.find(p => p.id && p.id === participantB?.id)

  // TODO: @Anton refactor this mess
  return [{
    ...participantAData,
    id: participantAData?.id,
    score: participantA?.meta?.score,
    name: participantAData?.name || 'TBD',
    coefficient: matchBets?.a,
    logo: participantAData?.logoUrl,
    key: 'a',
  }, {
    ...participantBData,
    id: participantBData?.id,
    score: participantB?.meta?.score,
    name: participantBData?.name || 'TBD',
    coefficient: matchBets?.b,
    logo: participantBData?.logoUrl,
    key: 'b',
  }]
}
