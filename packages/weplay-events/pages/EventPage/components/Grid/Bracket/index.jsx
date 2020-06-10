import React from 'react'
import PropTypes from 'prop-types'

import { roundPropType } from 'weplay-events/customPropTypes'

import Round from '../Round'

import styles from './styles.scss'

const Bracket = ({ rounds }) => (
  <div className={styles.root}>
    {rounds.map((round, index, array) => (
      <Round
        key={round.id}
        round={round}
        isLast={array.length - 1 === index}
        isFirst={index === 0}
      />
    ))}
  </div>
)

Bracket.propTypes = {
  rounds: PropTypes.arrayOf(roundPropType).isRequired,
}

Bracket.defaultProps = {
}

export default React.memo(Bracket)
