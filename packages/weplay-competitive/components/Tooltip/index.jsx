import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Tooltip = ({
  // required props
  title,
  children,
  // container props

  // optional props
  className,
}) => (
  <span
    title={title}
    className={classNames(className)}
  >
    {children}
  </span>
)

Tooltip.propTypes = {
  // required props
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  // container props

  // optional props
  className: PropTypes.string,
}

Tooltip.defaultProps = {
  // optional props
  className: '',
}

export default Tooltip
