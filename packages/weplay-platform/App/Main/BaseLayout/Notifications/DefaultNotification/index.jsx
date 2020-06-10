import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'weplay-components/Icon'

import container from './container'
import styles from './styles.scss'

const DefaultNotification = ({
  // required props
  text,
  closeNotification,
  // container props

  // optional props
}) => (
  <>
    <p className={styles.text}>
      {text}
    </p>
    <button
      onClick={closeNotification}
      className={styles.close}
      type="button"
    >
      <Icon
        iconName="close"
        className={styles.icon}
      />
    </button>
  </>
)

DefaultNotification.propTypes = {
  // required props
  text: PropTypes.string.isRequired,
  closeNotification: PropTypes.func.isRequired,
  // container props
  // optional props
}

DefaultNotification.defaultProps = {
  // optional props
}

export default container(DefaultNotification)
