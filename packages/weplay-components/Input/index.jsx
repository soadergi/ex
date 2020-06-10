import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import container from './container'
import styles from './styles.scss'

export const InputMarkup = ({
  // required props

  // container props
  className,

  // optional props
  type,
  ...props
}) => (
  <input
    type={type}
    className={classNames(className, styles.input)}
    {...props}
  />
)

InputMarkup.propTypes = {
  // required props

  // container props

  // optional props
  type: PropTypes.string,
  className: PropTypes.string,
}

InputMarkup.defaultProps = {
  // optional props
  type: 'text',
  className: '',
}

export default container(InputMarkup)
