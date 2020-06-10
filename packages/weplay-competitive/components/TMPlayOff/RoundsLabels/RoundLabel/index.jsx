import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { capitalizeFirstLetter } from 'weplay-core/helpers/capitalizeFirstLetter'

import { MATCH_STATUSES } from 'weplay-competitive/constants/matchStatuses'

import container from './container'
import styles from './styles.scss'

const RoundLabel = ({
  // required props
  round,
  roundStatus,
  // container props

  voteFormat,
  // optional props

}) => (
  <div
    className={classNames(
      styles.wrapper,
      {
        [styles.isOngoing]: roundStatus === MATCH_STATUSES.ONGOING,
      },
    )}
    key={round.label}
  >
    <p className={classNames(
      styles.label,
      'u-mb-0',
    )}
    >
      {round.label}
    </p>
    <p className={classNames(
      styles.status,
      'u-mb-0',
    )}
    >
      {voteFormat}
      {' • '}
      {capitalizeFirstLetter(roundStatus)}
    </p>
  </div>
)

RoundLabel.propTypes = {
  // required props
  round: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }).isRequired,
  roundStatus: PropTypes.string.isRequired,

  // container props
  voteFormat: PropTypes.string.isRequired,
  // optional props
}

RoundLabel.defaultProps = {

}

export default container(RoundLabel)
