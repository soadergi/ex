import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import GoogleAuthComponent from 'weplay-components/GoogleAuthComponent/GoogleAuthComponent'
import Icon from 'weplay-components/Icon'

import styles from '../styles.scss'

import container from './container'

const GoogleLogin = ({
  config,
  handleSuccess,
}) => (
  <GoogleAuthComponent
    className={classNames(
      styles.link,
      styles[config.icon],
    )}
    config={config}
    handleSuccess={handleSuccess}
  >
    <Icon
      className={styles.icon}
      iconName={config.icon}
      size="small"
    />
  </GoogleAuthComponent>
)

GoogleLogin.propTypes = {
  config: PropTypes.shape({
    icon: PropTypes.string.isRequired,
  }).isRequired,
  handleSuccess: PropTypes.func.isRequired,
}

export default container(GoogleLogin)
