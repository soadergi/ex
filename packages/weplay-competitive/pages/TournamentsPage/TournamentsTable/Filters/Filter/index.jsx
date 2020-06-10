import React from 'react'
import PropTypes from 'prop-types'
import Select from 'weplay-components/Select'

import container from './container'

const Filter = ({
  // required props
  filterConfig: {
    fieldType,
    options,
    isDisabled,
  },
  value,
  // container props
  handleChangeInput,

  // optional props
}) => (
  <>
    {fieldType === 'select' && (
      <Select
        options={options}
        onChange={handleChangeInput}
        value={value}
        disabled={isDisabled}
      />
    )}
    {fieldType !== 'select' && (
      <input
        type={fieldType}
        value={value}
        onChange={handleChangeInput}
      />
    )}
  </>
)

Filter.propTypes = {
  // required props
  filterConfig: PropTypes.shape({
    fieldName: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    fieldType: PropTypes.oneOf(['select', 'number', 'text']).isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({}),
    ).isRequired,
  }).isRequired,

  // container props
  handleChangeInput: PropTypes.func.isRequired,

  // optional props
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

Filter.defaultProps = {
  // optional props
  value: null,
}

export default container(Filter)
