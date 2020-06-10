import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import container from './container'
import styles from './styles.scss'

const Wrapper = ({
  // required props
  children,
  // container props
  // optional props
  className,
  hasDisableFlexbox,
}) => (
  <div
    className={classNames(
      styles.block,
      className,
      { [styles.hasDisableFlexbox]: hasDisableFlexbox },
    )}
  >
    {children}
  </div>
)

Wrapper.propTypes = {
  // required props
  children: PropTypes.node.isRequired,
  // container props
  hasDisableFlexbox: PropTypes.bool,
  // optional props
  className: PropTypes.string,
}

Wrapper.defaultProps = {
  // optional props
  className: '',
  hasDisableFlexbox: false,
}

export default container(Wrapper)
