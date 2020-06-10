import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker/es'

import container from './container'
import './styles.scss'

export const DatepickerMarkup = ({
  // required props
  value,
  onChange,

  // container props
  handleFocus,

  // optional props
}) => (
  <DatePicker
    selected={value}
    onChange={onChange}
    onFocus={handleFocus}
    dropdownMode="select"
    showMonthDropdown
    showYearDropdown
    dateFormat="yyyy-MM-dd"
    autoComplete="off"
  />
)

DatepickerMarkup.propTypes = {
  // required props
  value: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,

  // container props
  handleFocus: PropTypes.func.isRequired,

  // optional props
}

DatepickerMarkup.defaultProps = {
  // optional props
}

export default container(DatepickerMarkup)
