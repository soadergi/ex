import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'

const FormAutocompleteDisabler = ({
  triggerName,
}) => (
  <input
    className={styles.block}
    value="any value"
    type="text"
    name={triggerName}
    autoComplete={triggerName}
    readOnly
  />
)

FormAutocompleteDisabler.propTypes = {
  triggerName: PropTypes.string.isRequired,
}

export default FormAutocompleteDisabler
