import * as R from 'ramda'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'
import container from './container'

const Score = ({
  // required props
  isTwoParticipantsExists,

  // optional props
  scoreA,
  scoreB,
}) => (
  <div className={classNames(
    styles.divider,
    {
      [styles.hasScore]: !R.isNil(scoreA) && !R.isNil(scoreB) && isTwoParticipantsExists,
    },
  )}
  >
    {!R.isNil(scoreA) && !R.isNil(scoreB) && isTwoParticipantsExists
      ? (
        <div className={styles.scores}>
          <span className={classNames({
            'u-text-normal u-color-blue': scoreA > scoreB,
          })}
          >
            {scoreA}
          </span>
          <span className="u-mx-1 u-mx-sm-half">:</span>
          <span className={classNames({
            'u-text-normal u-color-blue': scoreB > scoreA,
          })}
          >
            {scoreB}
          </span>
        </div>
      )
      : (
        <Fragment>
          <p className={styles.dividerText}>VS</p>
        </Fragment>
      )}
  </div>
)

Score.propTypes = {
  // required props
  isTwoParticipantsExists: PropTypes.bool.isRequired,

  // optional props
  scoreA: PropTypes.number,
  scoreB: PropTypes.number,
}

Score.defaultProps = {
  // optional props
  scoreA: null,
  scoreB: null,
}

export default container(Score)
