import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from 'weplay-components/Icon'

import styles from './MobileScore.scss'

const ParticipantScore = ({ isWinner, score }) => (
  <div
    className={classNames(
      styles.score,
      { [styles.isWinner]: isWinner },
    )}
  >
    {isWinner
      ? (
        <Icon
          iconName="cup"
          className={styles.icon}
        />
      )
      : <div className={styles.empty} />}

    {score}
  </div>
)

ParticipantScore.propTypes = {
  isWinner: PropTypes.bool.isRequired,
  score: PropTypes.number,
}

ParticipantScore.defaultProps = {
  score: '-',
}

export default React.memo(ParticipantScore)
