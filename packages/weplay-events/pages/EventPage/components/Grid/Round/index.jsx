import React from 'react'
import PropTypes from 'prop-types'

import { roundPropType } from 'weplay-events/customPropTypes'
import MetaInformation from 'weplay-events/components/Match/MetaInformation'

import { NODE_WIDTH, X_SPACING } from '../logic/tree/constants'

import styles from './styles.scss'

function getRoundWidth(isFirst, isLast) {
  if (isFirst && isLast) {
    return NODE_WIDTH
  }

  if (isFirst || isLast) {
    return NODE_WIDTH + X_SPACING / 2
  }

  return NODE_WIDTH + X_SPACING
}

const Round = ({
  round, isLast, isFirst,
}) => (
  <div
    className={styles.root}
    style={{
      maxWidth: getRoundWidth(isFirst, isLast),
      ...isFirst && { marginRight: `${X_SPACING / 2}px` },
      ...isLast && { marginLeft: `${X_SPACING / 2}px` },
    }}
  >
    <MetaInformation
      round={round}
      className={!isLast ? styles.round : ''}
    />
  </div>
)

Round.propTypes = {
  round: roundPropType.isRequired,
  isLast: PropTypes.bool,
  isFirst: PropTypes.bool,
}

Round.defaultProps = {
  isLast: false,
  isFirst: false,
}

export default React.memo(Round)
