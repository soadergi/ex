import React from 'react'
import PropTypes from 'prop-types'

import Icon from '../ToastIcon'

// DUPLICATED HERE TO AVOID CIRCULAR DPS
import container from './container'
import styles from './styles'

const ToastCloseButton = ({
  // required props
  closeToast,
  // container props
  // optional props
}) => (
  <button
    className={styles.block}
    type="button"
    onClick={closeToast}
  >
    <Icon
      iconName="close"
      className={styles.icon}
    />
  </button>
)

ToastCloseButton.propTypes = {
  // required props
  closeToast: PropTypes.func.isRequired,
  // container props
  // optional props
}

export default container(ToastCloseButton)
