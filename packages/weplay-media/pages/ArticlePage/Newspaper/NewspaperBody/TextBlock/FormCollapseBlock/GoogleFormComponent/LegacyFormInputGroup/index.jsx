import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import container from './container'
import styles from './styles.scss'

const LegacyFormInputGroup = ({
  labelText,
  children,
  hasError,
  errorText,
}) => (
  <div className={classNames(
    styles.block,
    { [styles.hasError]: hasError },
  )}
  >
    <div className={styles.header}>
      <label
        className={styles.label}
        htmlFor="candidate-email"
      >
        {labelText}
      </label>
    </div>
    <div className={styles.field}>
      {children}
    </div>
    <span className={styles.message}>
      {errorText}
    </span>
  </div>
)

LegacyFormInputGroup.propTypes = {
  children: PropTypes.element.isRequired,
  labelText: PropTypes.string.isRequired,
  hasError: PropTypes.bool,
  errorText: PropTypes.string,
}

LegacyFormInputGroup.defaultProps = {
  errorText: '',
  hasError: false,
}

export default container(LegacyFormInputGroup)
