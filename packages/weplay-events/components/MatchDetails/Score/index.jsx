import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import container from './container'
import styles from './styles.scss'

const Score = ({
  // required props
  firstPart,
  secondPart,
  total,

  // container props

  // optional props
  className,
  isShooterStats,
}) => (
  <div
    className={classNames(
      styles.block,
      styles.mobaScore,
      {
        [className]: className,
        [styles.shooterScore]: isShooterStats,
      },
    )}
  >
    <span
      className={classNames(
        styles.mobaTotal,
        {
          [styles.shooterTotal]: isShooterStats,
        },
      )}
    >
      {total}
    </span>

    <div
      className={styles.summary}
    >
      <span
        className={styles.firstPart}
      >
        {firstPart}
      </span>
      <span
        className={styles.secondPart}
      >
        {secondPart}
      </span>
    </div>
  </div>

)

Score.propTypes = {
  // required props
  total: PropTypes.number.isRequired,

  // container props

  // optional props
  className: PropTypes.string,
  isShooterStats: PropTypes.bool,
  firstPart: PropTypes.number,
  secondPart: PropTypes.number,
}

Score.defaultProps = {
  // optional props
  className: '',
  isShooterStats: false,
  firstPart: '',
  secondPart: '',
}

export default container(Score)
