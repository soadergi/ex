import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from 'weplay-components/Icon'

import styles from './styles.scss'

const MMTimer = ({
  // required props
  isActiveTimer,
  minutes,
  seconds,
  // optional props
  hours,
  size,
  isWarning,
}) => (
  <div className={classNames(
    styles.block,
    {
      [styles.isWarning]: isWarning,
    },
    styles[size],
  )}
  >
    <Icon
      iconName="clock"
      className={styles.icon}
    />
    <div className={styles.timer}>
      {isActiveTimer ? `${+hours ? `${hours}:` : ''}${minutes}:${seconds}` : ''}
    </div>
  </div>
)

MMTimer.propTypes = {
  // required props
  isActiveTimer: PropTypes.bool.isRequired,
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
  // optional props
  size: PropTypes.string,
  hours: PropTypes.string,
  isWarning: PropTypes.bool,
}

MMTimer.defaultProps = {
  // optional props
  hours: '00',
  size: 'md',
  isWarning: false,
}

export default MMTimer
