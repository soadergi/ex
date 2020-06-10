import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'

import styles from '../styles.scss'

import container from './container'

const OAuth2Login = ({
  config,
  handleOpenAuthPopup,
}) => (
  <a
    className={classNames(
      styles.link,
      styles[config.icon],
    )}
    onClick={handleOpenAuthPopup}
  >
    <Icon
      className={styles.icon}
      iconName={config.icon}
      size="small"
    />
  </a>

)

OAuth2Login.propTypes = {
  config: PropTypes.shape({
    icon: PropTypes.string.isRequired,
  }).isRequired,
  handleOpenAuthPopup: PropTypes.func.isRequired,
}

export default container(OAuth2Login)
