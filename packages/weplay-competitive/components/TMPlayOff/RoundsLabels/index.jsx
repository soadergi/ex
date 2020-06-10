import React from 'react'
import PropTypes from 'prop-types'

import RoundLabel from './RoundLabel'
import styles from './styles.scss'

const RoundsLabels = ({
  // required props
  rounds,
  getRoundStatus,
  // container props

  // optional props

}) => (
  <div className={styles.labels}>
    {rounds.map(round => round.label && (
      <RoundLabel
        key={round.label}
        round={round}
        roundStatus={getRoundStatus(round)}
      />
    ))}
  </div>
)

RoundsLabels.propTypes = {
  // required props
  rounds: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
  })).isRequired,
  getRoundStatus: PropTypes.func.isRequired,
  // container props

  // optional prop

}

RoundsLabels.defaultProps = {

}

export default RoundsLabels
