import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'

const Status = ({
  // required props
  children,
  // container props

  // optional props
  isWarning,
  isSuccess,
}) => (
  <div
    className={classNames(
      styles.block,
      {
        [styles.isWarning]: isWarning,
        [styles.isSuccess]: isSuccess,
      },
    )}
  >
    {children}
  </div>
)

Status.propTypes = {
  // required props
  children: PropTypes.node,
  // container props

  // optional props
  isWarning: PropTypes.bool,
  isSuccess: PropTypes.bool,
}

Status.defaultProps = {
  // optional props
  isWarning: false,
  isSuccess: false,
  children: null,
}

export default Status
