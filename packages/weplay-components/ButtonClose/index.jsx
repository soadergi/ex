import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'

import styles from './styles.scss'
import container from './container'

const ButtonClose = ({
  // required props
  onButtonClick,
  // container props
  // optional props
  modification,
  className,
}) => (
  <button
    type="button"
    onClick={onButtonClick}
    className={classNames(
      styles.block,
      styles[modification],
      className,
    )}
  >
    <Icon
      iconName="close"
      className={styles.icon}
    />
  </button>
)

ButtonClose.propTypes = {
  // required props
  onButtonClick: PropTypes.func.isRequired,
  // container props
  // optional props
  modification: PropTypes.oneOf(['', 'searchInput']),
  className: PropTypes.string,
}

ButtonClose.defaultProps = {
  // optional props
  modification: '',
  className: '',
}

export default container(ButtonClose)
