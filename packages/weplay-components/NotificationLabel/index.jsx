import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import styles from './style.scss'
import container from './container'

const sizes = [
  'large',
  'xl',
  '',
]

const colors = [
  'isSuccess',
  'isDisabled',
  'isNotify',
  'isWarning',
  'isDefault',
  '',
]

const NotificationLabel = ({
  className,
  size,
  color,
  isActive,
  title,
}) => (
  <div
    title={title}
    className={classNames(
      styles.notification,
      styles[size],
      styles[color],
      className,
      {
        [styles.isActive]: isActive,
      },
    )}
  />
)

NotificationLabel.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf([...sizes, '']),
  color: PropTypes.oneOf([...colors, '']),
  isActive: PropTypes.bool,
  title: PropTypes.string,
}

NotificationLabel.defaultProps = {
  className: '',
  size: '',
  color: '',
  title: '',
  isActive: false,
}

export default container(NotificationLabel)
