import { useSelector } from 'react-redux'

import { participantsSelectors } from 'weplay-events/reduxs/participants'

export const usePrizeWinners = ({ prize }) => {
  const participantSelector = useSelector(participantsSelectors.getRecordByIdSelector)
  const winnersAmount = prize?.slots
  const prizeWinners = prize.relationships?.participants?.length
    ? prize.relationships.participants
    : new Array(winnersAmount).fill({ name: 'TBD' })

  const winners = prizeWinners.map(winner => participantSelector(winner.id) || winner)

  return { winners }
}
