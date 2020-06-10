import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import container from './container'
import styles from './styles.scss'

const colors = [
  'magenta',
  'success',
  'warning',
  'white',
  'blue',
  'brightBlue',
]

const Label = ({
  // required props
  children,
  // container props

  // optional props
  className,
  color,
}) => (
  <span
    className={classNames(
      styles.block,
      className,
      styles[color],
    )}
  >
    {children}
  </span>
)

Label.propTypes = {
  // required props
  children: PropTypes.node,
  // container props

  // optional props
  className: PropTypes.string,
  color: PropTypes.oneOf(colors).isRequired,
}

Label.defaultProps = {
  // optional props
  className: '',
  children: null,
}

export default container(Label)
