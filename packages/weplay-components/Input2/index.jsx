import React from 'react'
import * as R from 'ramda'
import * as PropTypes from 'prop-types'
import {
  Field,
} from 'formik'
import classNames from 'classnames'

import styles from './styles.scss'
import container from './container'

const Input2 = ({
  disabled,
  id,
  hasError,
  type,
  hasSuccess,
  name,
  placeholder,
  onBlur,
  autocomplete,
}) => (
  <Field
    type={type}
    name={name}
    placeholder={placeholder}
    id={id}
    className={classNames(
      styles.input,
      {
        [styles.hasError]: hasError,
        [styles.hasSuccess]: hasSuccess,
      },
    )}
    disabled={disabled}
    autoсomplete={autocomplete}
    onBlur={onBlur}
  />
)

Input2.propTypes = {
  // required props
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  hasError: PropTypes.bool.isRequired,
  hasSuccess: PropTypes.bool,
  // container props

  // optional props
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onBlur: PropTypes.func,
  autocomplete: PropTypes.string,
}

Input2.defaultProps = {
  // optional props
  disabled: false,
  placeholder: '',
  type: 'text',
  hasSuccess: false,
  onBlur: R.always,
  autocomplete: 'off',
}

export default container(Input2)
