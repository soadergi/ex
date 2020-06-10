import React from 'react'
import PropTypes from 'prop-types'
import SvgIcon from 'weplay-components/SvgIcon'
import classNames from 'classnames'

import styles from './styles.scss'
import container from './container'

const ScrollUpButton = ({
  // required props

  // props from container

  // optional props
  className,
}) => (
  <button
    type="button"
    className={classNames(
      styles.button,
      className,
    )}
  >
    <SvgIcon
      iconName="arrow"
      className={styles.icon}
    />
  </button>
)

ScrollUpButton.propTypes = {
  // required props

  // props from container

  // optional props
  className: PropTypes.string,
}

ScrollUpButton.defaultProps = {
  // optional props
  className: '',
}

export default container(ScrollUpButton)
