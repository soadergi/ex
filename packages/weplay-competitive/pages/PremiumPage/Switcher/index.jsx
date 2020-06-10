import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'
import container from './container'

const Switcher = ({
  // required props
  isChecked,
  onChange,
  // container props
  // optional props

}) => (
  <label
    className={styles.block}
  >
    <input
      type="checkbox"
      className={styles.input}
      checked={isChecked}
      onChange={onChange}
    />
    <span className={styles.circle} />
  </label>
)

Switcher.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

Switcher.defaultProps = {

}

export default container(Switcher)
