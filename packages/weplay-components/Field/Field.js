import React, { useMemo } from 'react'
import * as PropTypes from 'prop-types'

import FieldWrapper from 'weplay-components/FieldWrapper'
import Input from 'weplay-components/Input'
import Textarea from 'weplay-components/Textarea/Textarea'
import Select from 'weplay-components/Select'
import Checkbox from 'weplay-components/Checkbox'

import classes from './Field.scss'

const getInput = (type, field, props) => {
  switch (type) {
    case 'select':
      // TODO: probably not working
      return (
        <Select
          {...field}
          {...props}
        />
      )
    case 'textarea':
      return (
        <Textarea
          {...field}
          {...props}
        />
      )
    case 'checkbox':
      return (
        <Checkbox
          {...field}
          {...props}
        />
      )
    default:
      return (
        <Input
          type="text"
          {...field}
          {...props}
        />
      )
  }
}

const Field = ({
  field,
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  type,
  ...props
}) => {
  const isTouched = touched[field.name]
  const hasError = Boolean(errors[field.name])
  const errorsArray = useMemo(() => errors[field.name] && [errors[field.name]], [errors, field.name])
  return type === 'checkbox'
    ? (
      <Checkbox
        {...field}
        {...props}
        text={label}
        className={classes.btbCheckbox}
      />
    )
    : (
      <FieldWrapper
        label={label}
        isTouched={isTouched}
        errors={errorsArray}
        hasSuccess={isTouched && !hasError}
      >
        {getInput(type, field, props)}
      </FieldWrapper>
    )
}
Field.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.shape({}).isRequired,
    errors: PropTypes.shape({}).isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'text',
    'email',
    'number',
    'select',
    'textarea',
    'checkbox',
  ]).isRequired,
}
export default React.memo(Field)
