import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'
import container from './container'

// TODO: OLEG||ANTON THIS IS USED ONLY IN TOURNAMENT
const TextMessage = ({
  // required props
  children,
  // optional props
  className,
  isError,
  isSuccess,
}) => (
  <div className={classNames(
    styles.wrapper,
    className,
    {
      [styles.error]: isError,
      [styles.success]: isSuccess,
    },
  )}
  >
    <span className={styles.body}>
      {children}
    </span>
  </div>
)

TextMessage.propTypes = {
  // required props
  children: PropTypes.node.isRequired,
  // optional props
  className: PropTypes.string,
  isSuccess: PropTypes.bool,
  isError: PropTypes.bool,
}

TextMessage.defaultProps = {
  // optional props
  className: '',
  isSuccess: false,
  isError: false,
}

export default container(TextMessage)
