import React from 'react'

import { formatPrizeWithDigit } from 'weplay-core/helpers/formatPrizeWithDigits'

import Image from 'weplay-components/Image'

import prizePoolItemPropType from 'weplay-events/customPropTypes/prizePoolItemPropType'

import PrizePoolWinner from '../PrizePoolWinner/PrizePoolWinner'

import styles from './styles.scss'
import { usePrizeWinners } from './container'

function formatPrizeLabel(prize, extraPrize) {
  if (prize && extraPrize) {
    return `$${formatPrizeWithDigit(prize)} + ${extraPrize}`
  }

  if (prize && !extraPrize) {
    return `$${formatPrizeWithDigit(prize)}`
  }

  if (!prize && extraPrize) {
    return extraPrize
  }

  return ''
}

const PrizePoolItem = ({ prize }) => {
  const { winners } = usePrizeWinners({ prize })

  return winners.map(winner => (
    <div
      key={winner.id}
      className={styles.winner}
    >
      <div className={styles.prize}>
        <p className={styles.label}>
          {prize.placeName}
        </p>
      </div>

      <PrizePoolWinner winner={winner} />

      {Boolean(prize.prize || prize.extraPrize) && (
        <div className={styles.sumWrapper}>
          <span className={styles.sum}>
            {formatPrizeLabel(prize.prize, prize.extraPrize)}
            {/* TODO: @Artem.A check this out */}
            {winner.extraPrizeIconUrl && (
              <Image
                src={winner.extraPrizeIconUrl}
                alt="Prize icon"
              />
            )}
          </span>
        </div>
      )}
    </div>
  ))
}

PrizePoolItem.propTypes = {
  prize: prizePoolItemPropType.isRequired,
}

export default PrizePoolItem
