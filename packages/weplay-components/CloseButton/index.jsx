import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'weplay-components/Icon'

import container from './container'
import styles from './styles.scss'

export const CloseButtonMarkup = ({
  // required props
  onClick,

  // container props

  // optional props
}) => (
  <button
    type="button"
    className="c-modal__close"
    onClick={onClick}
  >
    <Icon
      iconName="close"
      className={styles.icon}
    />
  </button>
)

CloseButtonMarkup.propTypes = {
  // required props
  onClick: PropTypes.func.isRequired,

  // container props

  // optional props
}

CloseButtonMarkup.defaultProps = {
  // optional props
}

export default container(CloseButtonMarkup)
