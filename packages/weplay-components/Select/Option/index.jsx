import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import styles from './styles.scss'
import container from './container'

const Option = ({
  // required props
  option,
  handleChange,
  isActive,
  modifiers,
  // container props

  // optional props
  color,
}) => (

  <li className={classNames(
    styles.block,
    styles[color],
    {
      [styles.isActive]: isActive,
      [styles.dropdown]: modifiers.includes('dropdown'),
    },
  )}
  >
    <button
      className={styles.button}
      type="button"
      onClick={handleChange}
    >
      <span className={styles.value}>
        {option.label}
      </span>
    </button>
  </li>
)

Option.propTypes = {
  option: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    label: PropTypes.string,
    isActive: PropTypes.bool,
    isDefault: PropTypes.bool,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  modifiers: PropTypes.arrayOf(PropTypes.string).isRequired,
  // required props

  // container props

  // optional props
  color: PropTypes.string,
}

Option.defaultProps = {
  // optional props
  color: '',
}

export default container(Option)
