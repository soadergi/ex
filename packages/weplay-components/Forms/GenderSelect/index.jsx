import React from 'react'
import PropTypes from 'prop-types'

import Select from 'weplay-components/Select'

import container from './container'

const GenderSelect = ({
  // required props
  genderOptions,
  gender,
  onChange,
  placeholder,
  // container props

  // optional props
}) => (
  <Select
    name="gender"
    value={gender}
    options={genderOptions}
    onChange={onChange}
    placeholder={placeholder}
  />
)

GenderSelect.propTypes = {
  // required props
  i18nTexts: PropTypes.shape({}).isRequired,
  genderOptions: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  gender: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  // container props

  // optional props
}

export default container(GenderSelect)
