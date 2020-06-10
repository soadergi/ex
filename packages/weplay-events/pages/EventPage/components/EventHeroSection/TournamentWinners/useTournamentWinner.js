import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { getPrizesByTournamentIdSelector } from 'weplay-events/reduxs/prizes/selectors'
import { participantsSelectors } from 'weplay-events/reduxs/participants'
import getSortedPrizePool from 'weplay-events/pages/EventPage/helpers/getSortedPrizePool'

const defaultParticipant = {
  id: null,
}

const defaultFirstPlace = {
  relationships: {
    participants: [defaultParticipant],
  },
  prize: ' ',
}

function useTournamentWinner(tournamentId) {
  const getPrizesByTournamentId = useSelector(getPrizesByTournamentIdSelector)
  const getParticipantsById = useSelector(participantsSelectors.getRecordByIdSelector)

  const tournamentPrizes = useMemo(() => getPrizesByTournamentId(tournamentId), [tournamentId])

  const prizePool = getSortedPrizePool(tournamentPrizes)

  const firstPlace = prizePool[0] ?? defaultFirstPlace

  const winnerParticipant = firstPlace?.relationships?.participants[0] ?? defaultParticipant

  return {
    winner: getParticipantsById(winnerParticipant.id),
    prize: firstPlace.prize,
  }
}

export default useTournamentWinner
