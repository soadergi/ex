import * as R from 'ramda'
import React from 'react'
import * as PropTypes from 'prop-types'
import FieldWrapper from 'weplay-components/FieldWrapper'
import Input from 'weplay-components/Input2'

import container from './container'

const FormInputGroup = ({
  successText,
  isTouched,
  errors,
  label,
  placeholder,
  name,
  labelFor,
  hasSuccess,
  type,
  disabled,
  id,
  handleBlur,
  onClick,
  linkText,
}) => (
  <>
    <FieldWrapper
      label={label}
      isTouched={isTouched}
      errors={errors}
      successText={successText}
      name={name}
      labelFor={labelFor}
      hasSuccess={hasSuccess}
      type={type}
      onClick={onClick}
      linkText={linkText}
    >
      <Input
        placeholder={placeholder}
        name={name}
        isTouched={isTouched}
        errors={errors}
        id={id}
        hasSuccess={hasSuccess}
        onBlur={handleBlur}
        disabled={disabled}
      />
    </FieldWrapper>
  </>

)

FormInputGroup.propTypes = {
  // required props
  successText: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  labelFor: PropTypes.string.isRequired,
  hasSuccess: PropTypes.bool,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  linkText: PropTypes.string,
  isTouched: PropTypes.bool,
  handleBlur: PropTypes.func,
  onClick: PropTypes.func,
  // container props

  // optional props

}

FormInputGroup.defaultProps = {
  // optional props
  hasSuccess: false,
  disabled: false,
  id: '',
  linkText: '',
  handleBlur: R.always,
  onClick: null,
  type: '',
  isTouched: false,
  placeholder: '',
  errors: null,
  successText: '',
}

export default container(FormInputGroup)
