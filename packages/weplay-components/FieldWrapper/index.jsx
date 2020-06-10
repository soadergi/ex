import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'
import container from './container'

// TODO: maybe it make sense to do usual component instead of wrapper? not sure
const FieldWrapper = ({
  // required props
  label,
  children,
  // props from container

  // optional props
  labelFor,
  linkText,
  onClick,
  isTouched,
  errors,
  hint,
  classes,
  isRequired,
  hasSuccess,
  hasError,
  successText,
}) => (
  <div
    className={classNames(
      styles.block,
      {
        [styles.hasError]: hasError,
        [styles.hasSuccess]: hasSuccess,
      },
      hint && styles.hasHint,
    )}
  >
    <div className={styles.header}>
      { label && (
      <label
        htmlFor={labelFor}
        className={classNames(
          styles.label,
          {
            [styles.isRequired]: isRequired,
          },
        )}
      >
        {label}
      </label>
      )}
      {linkText && (
      <button
        className={styles.link}
        onClick={onClick}
        type="button"
      >
        {linkText}
      </button>
      )}
    </div>
    <div
      className={classNames(
        classes.field,
      )}
    >
      {children}
    </div>
    <div className={styles.message}>
      {(isTouched && errors) && errors.map(error => (
        <span
          key={error}
        >
          {error}
        </span>
      ))}
      {hasSuccess && (
      <span>
        {successText}
      </span>
      )}
      {hint && !hasError && (
      <span>
        {hint}
      </span>
      )}
    </div>
  </div>
)

FieldWrapper.propTypes = {
  // required props
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,

  // props from container

  // optional props
  labelFor: PropTypes.string,
  isTouched: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
  hint: PropTypes.string,
  linkText: PropTypes.string,
  onClick: PropTypes.func,
  isRequired: PropTypes.bool,
  classes: PropTypes.shape({
    field: PropTypes.string,
  }),
  hasSuccess: PropTypes.bool,
  hasError: PropTypes.bool.isRequired,
  successText: PropTypes.string,
}

FieldWrapper.defaultProps = {
  // optional props
  isTouched: false,
  errors: null,
  hint: '',
  classes: {},
  linkText: '',
  onClick: null,
  isRequired: false,
  successText: '',
  hasSuccess: false,
  labelFor: '',
}

export default container(FieldWrapper)
