import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SvgIcon from 'weplay-components/SvgIcon'
import container from 'weplay-components/Tip/container'

import styles from './styles.scss'

const Tip = ({
  // required props
  children,
  // container props

  // optional props
  isCenter,
  isWarning,
  isError,
  className,
  iconName,
}) => (
  <div className={classNames(
    className,
    {
      'u-text-center': isCenter,
    },
  )}
  >
    <span className={classNames(
      styles.block,
      {
        [styles.isWarning]: isWarning,
        [styles.isError]: isError,
        [styles.hasIcon]: iconName,
      },
    )}
    >
      {iconName && (
        <SvgIcon
          className={styles.icon}
          iconName={iconName}
        />
      )}
      {children}
    </span>
  </div>

)

Tip.propTypes = {
  // required props
  children: PropTypes.node.isRequired,
  // container props

  // optional props
  isCenter: PropTypes.bool,
  isWarning: PropTypes.bool,
  isError: PropTypes.bool,
  className: PropTypes.string,
  iconName: PropTypes.string,
}

Tip.defaultProps = {
  // optional props
  isCenter: false,
  isWarning: false,
  isError: false,
  className: '',
  iconName: '',
}

export default container(Tip)
