import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'
import container from './container'

const FilterButton = ({
  // required props
  buttonText,
  handleClick,
  isActive,

  // props from container

  // optional props
}) => (
  <button
    type="button"
    className={classNames(
      styles.button,
      { [styles.isActive]: isActive },
    )}
    onClick={handleClick}
  >
    {buttonText}
  </button>
)

FilterButton.propTypes = {
  // required props
  buttonText: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,

  // props from container

  // optional props
}

export default container(FilterButton)
