import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import container from './container'
import styles from './styles.scss'

const RadialSymbolsCounter = ({
  // required props
  hasLimitedSymbols,
  messageCounter,
  strokeDashoffset,
  className,
  // container props

  // optional props
}) => (
  <div
    className={classNames(
      className,
      styles.block,
      { [styles.hasError]: hasLimitedSymbols },
    )}
  >
    <svg
      className={styles.item}
      height="16"
      width="16"
      viewBox="0 0 18 18"
    >
      <circle
        className={styles.underlay}
        cx="50%"
        cy="50%"
        r="8"
        fill="none"
        strokeWidth="1"
      />
      <circle
        className={styles.circle}
        cx="50%"
        cy="50%"
        r="8"
        fill="none"
        strokeWidth="2"
        strokeDashoffset={strokeDashoffset}
        strokeDasharray={50}
      />
    </svg>
    <span className={styles.message}>{messageCounter}</span>
  </div>

)

RadialSymbolsCounter.propTypes = {
  // required props
  hasLimitedSymbols: PropTypes.bool.isRequired,
  messageCounter: PropTypes.string.isRequired,
  strokeDashoffset: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  // container props

  // optional props
}

RadialSymbolsCounter.defaultProps = {
  // optional props

}

export default container(RadialSymbolsCounter)
