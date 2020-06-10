import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'weplay-components/Icon'
import classNames from 'classnames'
import container from 'weplay-competitive/pages/MatchPage/Information/Overview/MatchInfo/Score/container'

import styles from './styles.scss'

const Score = ({
  // required props

  // container props

  // optional props
  score,
  isWinner,
  className,
  isRoundInProgress,
}) => (
  <span className={classNames(
    styles.block,
    className,
  )}
  >
    <span className={classNames(
      styles.scoreWrapper,
      {
        [styles.activeRound]: isRoundInProgress,
      },
    )}
    >
      {score}
      {/* TODO: plz add correct condition instead this */}
      {isWinner && (
        <Icon
          className={styles.icon}
          iconName="tournamentsCup"
          size="small"
        />
      )}
    </span>
  </span>
)

Score.propTypes = {
  // required props

  // container props

  // optional props
  score: PropTypes.number,
  isWinner: PropTypes.bool,
  className: PropTypes.string,
  isRoundInProgress: PropTypes.bool,
}

Score.defaultProps = {
  // optional props
  isWinner: false,
  score: 0,
  className: '',
  isRoundInProgress: false,
}

export default container(Score)
