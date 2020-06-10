import React from 'react'
import { useSelector } from 'react-redux'

import { getPrizesByTournamentIdSelector } from 'weplay-events/reduxs/prizes/selectors'
import { useCurrentTournamentId } from 'weplay-events/pages/EventPage/CurrentTournamentIdProvider'
import getSortedPrizePool from 'weplay-events/pages/EventPage/helpers/getSortedPrizePool'

import styles from './styles.scss'
import PrizePoolItem from './PrizePoolItem'

const PrizePoolList = () => {
  const tournamentId = useCurrentTournamentId()
  const prizes = useSelector(getPrizesByTournamentIdSelector)(tournamentId)

  const prizePool = getSortedPrizePool(prizes)

  return (
    <div className={styles.block}>
      {prizePool.map(prize => (
        <PrizePoolItem
          key={prize.id}
          iconClassName={styles.icon}
          prize={prize}
        />
      ))}
    </div>
  )
}

export default PrizePoolList
