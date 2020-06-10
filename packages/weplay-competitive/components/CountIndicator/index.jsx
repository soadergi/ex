import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'

const CountIndicator = ({
  // required props
  children,
  // container props

  // optional props
  className,
}) => (
  <div className={classNames(
    styles.indicator,
    className,
  )}
  >
    {children}
  </div>
)

CountIndicator.propTypes = {
  // required props
  children: PropTypes.node.isRequired,
  // container props

  // optional props
  className: PropTypes.string,
}

CountIndicator.defaultProps = {
  // optional props
  className: '',
}

export default CountIndicator
