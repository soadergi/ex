import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'weplay-components/Icon'
import Input from 'weplay-components/Input2'

import styles from './styles.scss'
import container from './container'

const PasswordInput = ({
  togglePasswordVisibility,
  isPasswordVisible,
  fieldType,
  errors,
  isTouched,
  handleBlur,
  ...props
}) => (
  <div className={styles.block}>
    <button
      type="button"
      onClick={togglePasswordVisibility}
      className={styles.button}
    >
      <Icon
        iconName="eye"
        className={styles.icon}
      />
    </button>

    <Input
      type={fieldType}
      errors={errors}
      isTouched={isTouched}
      {...props}
      id="password"
      autocomplete="password"
      onBlur={handleBlur}
    />

  </div>
)

PasswordInput.propTypes = {
  // required props

  // container props

  // optional props
  isPasswordVisible: PropTypes.bool,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  fieldType: PropTypes.string.isRequired,
  togglePasswordVisibility: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  isTouched: PropTypes.bool,
  handleBlur: PropTypes.func.isRequired,
}

PasswordInput.defaultProps = {
  // optional props
  isPasswordVisible: false,
  placeholder: '',
  errors: null,
  isTouched: false,
}

export default container(PasswordInput)
