import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import PrizeSum from '../PrizeSum'
import ProgressLine from '../ProgressLine/ProgressLine'
import { getNextMilestone } from '../../helpers'

import styles from './TargetLine.scss'

const INITIAL_PRIZE = 120000
const PERCENT = 100

const TargetLine = ({ donations }) => {
  const t = useTranslation()

  const nextMilestone = getNextMilestone(donations)

  const progressLineLengthInPercents = useMemo(
    () => ((donations.totalAmount - INITIAL_PRIZE) / (nextMilestone.amount - INITIAL_PRIZE)) * PERCENT,
    [donations.totalAmount, nextMilestone.amount],
  )

  const totalAmount = Math.floor(donations.totalAmount * PERCENT) / PERCENT

  return (
    <div className={styles.block}>
      <div className={styles.wrap}>
        <div className={styles.column}>
          <p className={styles.title}>{t('events.eventPage.blocks.charityPlayBlock.startStepDonate')}</p>

          <PrizeSum
            className={styles.sum}
            value={INITIAL_PRIZE}
          />
        </div>

        <div className={styles.column}>
          <p className={styles.title}>{t('events.eventPage.blocks.charityPlayBlock.middleStepDonate')}</p>

          <PrizeSum
            className={styles.raisedSum}
            value={totalAmount}
          />
        </div>

        <div className={styles.column}>
          <p className={styles.title}>{t('events.eventPage.blocks.charityPlayBlock.goalStepDonate')}</p>

          <PrizeSum
            className={styles.sum}
            value={nextMilestone.amount}
          />
        </div>
      </div>

      <ProgressLine
        value={progressLineLengthInPercents}
      />
    </div>
  )
}

TargetLine.propTypes = {
  donations: PropTypes.shape({
    totalAmount: PropTypes.number.isRequired,
    milestones: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
}

export default React.memo(TargetLine)
